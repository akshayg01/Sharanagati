// Reading and writing glorifications (and likes) against the acharya Supabase project.
//
// Tables and policies live in that project — see its
// supabase/migrations/20260905000010_quality_reflections.sql and ..._quality_likes.sql.
// Everything here fails soft: with no backend, or on any error, the page still renders.

import { getSupabase, MASTER_SLUG } from './supabase.js'

export const BODY_MIN = 10
export const BODY_MAX = 1500

/**
 * A devotee offers a glorification under one quality. Rows land as status 'new' and
 * private; nothing appears on the site until an admin publishes it in the acharya panel.
 * Signing in is optional — an anonymous offering is allowed by the table's insert policy.
 */
export async function submitGlorification({ qualitySlug, authorName, body, contactEmail, userId }) {
  const text = (body || '').trim()
  if (text.length < BODY_MIN || text.length > BODY_MAX) {
    return {
      ok: false,
      message: `Please write between ${BODY_MIN} and ${BODY_MAX} characters.`,
    }
  }

  const sb = await getSupabase()
  if (!sb) {
    return { ok: false, message: 'Offerings cannot be received right now. Please try again later.' }
  }

  const { error } = await sb.from('quality_reflections').insert({
    master_slug: MASTER_SLUG,
    quality_slug: qualitySlug,
    author_name: (authorName || '').trim() || null,
    body: text,
    contact_email: (contactEmail || '').trim() || null,
    user_id: userId || null,
  })

  if (error) {
    return {
      ok: false,
      message: 'Your offering could not be saved. Please check the length and try again.',
    }
  }
  return { ok: true }
}

/** Published glorifications for Maharaja, newest first. Empty when offline. */
export async function loadGlorifications() {
  const sb = await getSupabase()
  if (!sb) return []
  try {
    const { data, error } = await sb
      .from('quality_reflections_public')
      .select('*')
      .eq('master_slug', MASTER_SLUG)
      .order('created_at', { ascending: false })
      .limit(200)
    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

/** Offerings the signed-in devotee has sent, including ones still awaiting review. */
export async function loadMyGlorifications(userId) {
  if (!userId) return []
  const sb = await getSupabase()
  if (!sb) return []
  try {
    const { data, error } = await sb
      .from('quality_reflections')
      .select('id, quality_slug, body, status, is_public, created_at')
      .eq('master_slug', MASTER_SLUG)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

/** { qualitySlug: count } across everyone. Aggregate only — never who liked what. */
export async function loadLikeCounts() {
  const sb = await getSupabase()
  if (!sb) return {}
  try {
    const { data, error } = await sb.rpc('quality_like_counts', { p_master_slug: MASTER_SLUG })
    if (error || !data) return {}
    const counts = {}
    for (const row of data) counts[row.quality_slug] = Number(row.likes)
    return counts
  } catch {
    return {}
  }
}

/** The quality slugs this devotee has liked. Empty when signed out. */
export async function loadMyLikes(userId) {
  if (!userId) return []
  const sb = await getSupabase()
  if (!sb) return []
  try {
    const { data, error } = await sb
      .from('quality_likes')
      .select('quality_slug')
      .eq('master_slug', MASTER_SLUG)
      .eq('user_id', userId)
    if (error || !data) return []
    return data.map((row) => row.quality_slug)
  } catch {
    return []
  }
}

/** Add or remove this devotee's like on one quality. Returns the new liked state. */
export async function toggleLike(userId, qualitySlug, liked) {
  const sb = await getSupabase()
  if (!sb || !userId) return liked

  try {
    if (liked) {
      const { error } = await sb
        .from('quality_likes')
        .delete()
        .eq('user_id', userId)
        .eq('master_slug', MASTER_SLUG)
        .eq('quality_slug', qualitySlug)
      return error ? liked : false
    }
    const { error } = await sb
      .from('quality_likes')
      .insert({ user_id: userId, master_slug: MASTER_SLUG, quality_slug: qualitySlug })
    return error ? liked : true
  } catch {
    return liked
  }
}
