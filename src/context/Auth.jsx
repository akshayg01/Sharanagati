// Optional Google sign-in, against the same Supabase project the acharya site uses.
//
// Nothing on this site requires an account: a devotee may offer a glorification without
// signing in. Signing in only adds liking a quality and seeing your own pending offerings.
//
// The Supabase SDK is ~60 KB gzipped, so it is not loaded for everybody. The provider stays
// idle until one of three things is true: a page asks for it (connect()), the visitor is
// returning from Google with a code in the URL, or they already have a session stored.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getSupabase, redirectUrl } from '../lib/supabase.js'

// Where the devotee was when they clicked sign in — Google cannot send them back to a
// fragment, so we restore the route ourselves once the session lands.
const RETURN_KEY = 'sharanagati-auth-return'

// 'idle' → 'loading' → 'unavailable' | 'signed-out' | 'signed-in'
const AuthContext = createContext({
  status: 'idle',
  user: null,
  displayName: '',
  connect: () => {},
  signIn: () => {},
  signOut: () => {},
})

/** Is Supabase already holding a session for this browser? Its token key is `sb-<ref>-auth-token`. */
function hasStoredSession() {
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) return true
    }
  } catch {
    /* private mode, blocked storage — fall through */
  }
  return false
}

/** Are we mid sign-in, landing back from Google? */
function returningFromOAuth() {
  const search = window.location.search
  return search.includes('code=') || search.includes('error=')
}

export function AuthProvider({ children }) {
  const [wanted, setWanted] = useState(false)
  const [state, setState] = useState({ status: 'idle', user: null })

  const connect = useCallback(() => setWanted(true), [])

  // Connect unprompted only when there is already something to pick up.
  useEffect(() => {
    if (returningFromOAuth() || hasStoredSession()) setWanted(true)
  }, [])

  useEffect(() => {
    if (!wanted) return
    let cancelled = false
    let unsubscribe = () => {}

    setState((prev) => (prev.status === 'idle' ? { status: 'loading', user: null } : prev))

    getSupabase().then((sb) => {
      if (cancelled) return
      if (!sb) {
        setState({ status: 'unavailable', user: null })
        return
      }

      sb.auth.getSession().then(({ data }) => {
        if (cancelled) return
        setState({
          status: data.session ? 'signed-in' : 'signed-out',
          user: data.session?.user ?? null,
        })
      })

      const { data } = sb.auth.onAuthStateChange((_event, session) => {
        setState({ status: session ? 'signed-in' : 'signed-out', user: session?.user ?? null })

        // Back from Google: put the devotee where they were.
        if (session) {
          try {
            const back = localStorage.getItem(RETURN_KEY)
            if (back) {
              localStorage.removeItem(RETURN_KEY)
              if (back !== window.location.hash) window.location.hash = back
            }
          } catch {
            /* ignore */
          }
        }
      })
      unsubscribe = () => data.subscription.unsubscribe()
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [wanted])

  const signIn = useCallback(async () => {
    try {
      localStorage.setItem(RETURN_KEY, window.location.hash || '#/qualities')
    } catch {
      /* ignore */
    }
    const sb = await getSupabase()
    if (!sb) return
    await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl() },
    })
  }, [])

  const signOut = useCallback(async () => {
    const sb = await getSupabase()
    await sb?.auth.signOut()
  }, [])

  const value = useMemo(() => {
    const meta = state.user?.user_metadata || {}
    return {
      status: state.status,
      user: state.user,
      displayName: meta.full_name || meta.name || state.user?.email || '',
      connect,
      signIn,
      signOut,
    }
  }, [state, connect, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
