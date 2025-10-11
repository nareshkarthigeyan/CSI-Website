import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Supabase env vars not set for serverless function');
}

const supabase = createClient(SUPABASE_URL as string, SUPABASE_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const { event_slug, team_name, leader, members = [], metadata = {} } = payload;

    if (!event_slug || !leader || !leader.full_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // lookup event
    const { data: ev, error: evError } = await supabase
      .from('events')
      .select('id, requires_team')
      .eq('slug', event_slug)
      .single();

    if (evError || !ev) {
      return res.status(400).json({ error: 'Invalid event' });
    }

    // create registration
    const { data: reg, error: regErr } = await supabase
      .from('registrations')
      .insert([{ event_id: ev.id, team_name: team_name || null, metadata }])
      .select('*')
      .single();

    if (regErr || !reg) {
      return res.status(500).json({ error: 'Failed to create registration', details: regErr });
    }

    const regId = reg.id;

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
      // rollback
      await supabase.from('participants').delete().eq('registration_id', regId);
      await supabase.from('registrations').delete().eq('id', regId);
      return res.status(500).json({ error: 'Failed to insert participants', details: partsErr });
    }

    // fetch view
    const { data: saved, error: savedErr } = await supabase
      .from('registration_with_participants')
      .select('*')
      .eq('id', regId)
      .single();

    if (savedErr) {
      // return basic reg
      return res.status(201).json({ registration_number: reg.registration_number, id: regId });
    }

    return res.status(201).json({ registration: saved });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
