import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Supabase env vars not set for serverless function');
}

const supabase = createClient(SUPABASE_URL as string, SUPABASE_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[api/register] invoked', { time: new Date().toISOString(), method: req.method, url: req.url });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    // Log payload shape (but avoid sensitive data)
    try {
      const safePayload = { ...payload } as any;
      // redact potential large fields
      if (safePayload.metadata) safePayload.metadata = '[redacted]';
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
      ...members.map((m: any) => ({
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
  } catch (err: any) {
    console.error('[api/register] unexpected error', err && err.stack ? err.stack : err);
    // Expose minimal info to client but full stack is available in Vercel logs
    return res.status(500).json({ error: err?.message || 'Internal Server Error' , details: err?.stack ? err.stack.split('\n').slice(0,5).join('\n') : null });
  }
}
