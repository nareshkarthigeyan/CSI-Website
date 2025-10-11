import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Do NOT create the Supabase client at module-import time because missing envs here
// will crash the serverless function during import (observed in Vercel logs).
// We'll create the client inside the handler after verifying env vars.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[api/register] invoked', { time: new Date().toISOString(), method: req.method, url: req.url });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error('[api/register] Supabase env missing', { SUPABASE_URL: !!process.env.SUPABASE_URL, SUPABASE_KEY: !!process.env.SUPABASE_KEY });
      return res.status(500).json({ error: 'Server misconfigured: SUPABASE_URL or SUPABASE_KEY missing' });
    }
    const supabase = createClient(SUPABASE_URL as string, SUPABASE_KEY as string);

  type IncomingMember = { full_name: string; usn?: string | null; department?: string | null; semester?: string | null; phone?: string | null; email?: string | null };
  type IncomingPayload = { event_slug: string; team_name?: string | null; leader: IncomingMember; members?: IncomingMember[]; metadata?: Record<string, unknown> };
  const payload = req.body as IncomingPayload;
    // Log payload shape (but avoid sensitive data)
    try {
  const safePayload: Partial<IncomingPayload> = { ...payload };
  // redact potential large fields by replacing with an object marker
  if (safePayload.metadata) safePayload.metadata = { redacted: true } as Record<string, unknown>;
  console.log('[api/register] payload', JSON.stringify(safePayload));
    } catch (e) {
      console.log('[api/register] payload logging failed', String(e));
    }
    const { event_slug, team_name, leader, members = [], metadata = {} } = payload;

    if (!event_slug || !leader || !leader.full_name) {
      console.warn('[api/register] validation failed - missing fields', { event_slug, leaderPresent: !!leader });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // lookup event
    console.log('[api/register] looking up event by slug', event_slug);
    const { data: ev, error: evError } = await supabase
      .from('events')
      .select('id, requires_team, name, slug')
      .eq('slug', event_slug)
      .single();
    if (evError) {
      console.error('[api/register] event lookup error', evError);
    }
    if (!ev) {
      console.warn('[api/register] event not found', { event_slug, evError: evError?.message });
      return res.status(400).json({ error: 'Invalid event', details: evError?.message || null });
    }
    console.log('[api/register] event found', ev);

    // create registration
    const { data: reg, error: regErr } = await supabase
      .from('registrations')
      .insert([{ event_id: ev.id, team_name: team_name || null, metadata }])
      .select('*')
      .single();

    if (regErr || !reg) {
      console.error('[api/register] registration insert failed', regErr);
      return res.status(500).json({ error: 'Failed to create registration', details: regErr });
    }

    const regId = reg.id;
    console.log('[api/register] registration created', { regId, registration_number: reg.registration_number });

    const participantsPayload = [
      {
        registration_id: regId,
        is_leader: true,
        full_name: leader.full_name,
        usn: leader.usn || null,
        department: leader.department || null,
        semester: leader.semester || null,
        phone: leader.phone || null,
        email: leader.email || null,
      },
  ...members.map((m: IncomingMember) => ({
        registration_id: regId,
        is_leader: false,
        full_name: m.full_name,
        usn: m.usn || null,
        department: m.department || null,
        semester: m.semester || null,
        phone: m.phone || null,
        email: m.email || null,
      })),
    ];

    const { data: parts, error: partsErr } = await supabase
      .from('participants')
      .insert(participantsPayload)
      .select('*');
    if (partsErr) {
      console.error('[api/register] participants insert failed', partsErr);
      // rollback
      try {
  await supabase.from('participants').delete().eq('registration_id', regId);
  await supabase.from('registrations').delete().eq('id', regId);
      } catch (rbErr) {
        console.error('[api/register] rollback failed', rbErr);
      }
      return res.status(500).json({ error: 'Failed to insert participants', details: partsErr });
    }
    console.log('[api/register] participants inserted', { count: Array.isArray(parts) ? parts.length : 0 });

    // fetch view
    const { data: saved, error: savedErr } = await supabase
      .from('registration_with_participants')
      .select('*')
      .eq('id', regId)
      .single();

    if (savedErr) {
      console.warn('[api/register] saved view fetch failed', savedErr);
      // return basic reg
      return res.status(201).json({ registration_number: reg.registration_number, id: regId });
    }
    console.log('[api/register] returning saved registration view', saved?.id);
    return res.status(201).json({ registration: saved });
  } catch (err) {
    const unknownErr = err as unknown;
    if (typeof unknownErr === 'object' && unknownErr !== null && 'stack' in unknownErr) {
      const errObj = unknownErr as Error;
      console.error('[api/register] unexpected error', errObj.stack);
  const stackSnippet = errObj.stack ? errObj.stack.split('\n').slice(0,5).join('\n') : null;
  return res.status(500).json({ error: errObj.message || 'Internal Server Error', details: stackSnippet });
    }
    console.error('[api/register] unexpected error', String(unknownErr));
    return res.status(500).json({ error: String(unknownErr) || 'Internal Server Error', details: null });
  }
}
