// Supabase client for the glorifications people submit on the Qualities page.
//
// This is the SAME project the acharya site uses — its `quality_reflections` table is
// keyed by `master_slug`, so Sharanagati simply writes rows under MASTER_SLUG below and
// they are moderated from the acharya admin panel. No schema of our own.
//
// The SDK is imported dynamically so it stays out of the initial bundle, and the whole
// module resolves to null when the env vars are missing — so the site still builds and
// runs with no backend at all (the Qualities page then just hides the submission form).

/** Every row we read or write is tagged with this ācārya. */
export const MASTER_SLUG = 'bhakti-charu-swami'

let clientPromise = null

export function getSupabase() {
  if (clientPromise) return clientPromise

  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    clientPromise = Promise.resolve(null)
    return clientPromise
  }

  clientPromise = import('@supabase/supabase-js')
    .then(({ createClient }) =>
      createClient(url, key, {
        auth: {
          // The site runs on HashRouter, so there is no /auth/callback route to land on.
          // Google sends the visitor back to the page they left; supabase-js spots the
          // code in the URL, exchanges it for a session and tidies the URL up itself.
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
      }),
    )
    .catch(() => null)

  return clientPromise
}

/** True when the site was built with Supabase credentials. */
export const hasBackend = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

/**
 * Where Google should send the devotee back to. HashRouter keeps the route in the
 * fragment, so we hand Supabase the plain page URL — this exact value is what must be
 * listed under Authentication → URL Configuration → Redirect URLs in the Supabase project.
 */
export function redirectUrl() {
  return `${window.location.origin}${window.location.pathname}`
}
