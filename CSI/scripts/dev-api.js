// Lightweight local dev API to accept POST /api/register
// Usage: SUPABASE_URL=... SUPABASE_KEY=... node scripts/dev-api.js
// Or set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
const http = require('http');

const SUPA_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPA_URL || !SUPA_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY (or VITE_ equivalents). Set them before running this script.');
  process.exit(1);
}

const port = process.env.DEV_API_PORT ? Number(process.env.DEV_API_PORT) : 3000;

const sendJSON = (res, status, obj) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/register') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');

        // lookup event by slug
        const evResp = await fetch(`${SUPA_URL}/rest/v1/events?slug=eq.${encodeURIComponent(payload.event_slug)}`, {
          headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
        });
        const evJson = await evResp.json();
        const ev = Array.isArray(evJson) && evJson.length ? evJson[0] : null;
        if (!ev) return sendJSON(res, 400, { error: 'Event not found' });

        // create registration
        const regResp = await fetch(`${SUPA_URL}/rest/v1/registrations`, {
          method: 'POST',
          headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
          body: JSON.stringify([{ event_id: ev.id, team_name: payload.team_name || null, metadata: {} }]),
        });
        const regJson = await regResp.json();
        const reg = Array.isArray(regJson) && regJson.length ? regJson[0] : null;
        if (!reg) return sendJSON(res, 500, { error: 'Failed to create registration' });

        const regId = reg.id;

        const leader = payload.leader || {};
        const members = Array.isArray(payload.members) ? payload.members : [];

        const participants = [
          { registration_id: regId, is_leader: true, full_name: leader.full_name, usn: leader.usn || null, department: leader.department || null, semester: leader.semester || null, phone: leader.phone || null, email: leader.email || null },
          ...members.map((m) => ({ registration_id: regId, is_leader: false, full_name: m.full_name, usn: m.usn || null, department: m.department || null, semester: m.semester || null, phone: m.phone || null, email: m.email || null })),
        ];

        // insert participants
        await fetch(`${SUPA_URL}/rest/v1/participants`, {
          method: 'POST',
          headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
          body: JSON.stringify(participants),
        });

        // fetch registration view
        const savedResp = await fetch(`${SUPA_URL}/rest/v1/registration_with_participants?id=eq.${regId}`, {
          headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
        });
        const savedJson = await savedResp.json();
        const saved = Array.isArray(savedJson) && savedJson.length ? savedJson[0] : null;

        return sendJSON(res, 200, { registration: saved || { registration_number: reg.registration_number, id: regId, event_name: ev.name, team_name: reg.team_name } });
      } catch (err) {
        console.error('dev-api error:', err);
        return sendJSON(res, 500, { error: String(err && err.message ? err.message : err) });
      }
    });
    return;
  }

  // simple health
  if (req.method === 'GET' && req.url === '/api/health') {
    return sendJSON(res, 200, { ok: true });
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(port, () => {
  console.log(`Dev API listening on http://localhost:${port}`);
  console.log('Ensure you have SUPABASE_URL and SUPABASE_KEY (or VITE_ equivalents) set in the environment.');
});
