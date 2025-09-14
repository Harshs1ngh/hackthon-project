/**
 * Simple Express backend added by assistant.
 * - Uses in-memory JSON files in ./data for persistence (safe for development)
 * - Endpoints:
 *    GET  /api/packages
 *    GET  /api/packages/:id
 *    GET  /api/testimonials
 *    GET  /api/agents
 *    POST /api/auth/register
 *    POST /api/auth/login
 *    POST /api/contact
 *
 * To run:
 *   cd backend
 *   npm install
 *   npm run start
 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');

function readJSON(name) {
  try {
    const p = path.join(dataDir, name);
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}
function writeJSON(name, data) {
  const p = path.join(dataDir, name);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

/* Routes */
app.get('/api/packages', (req, res) => {
  const packages = readJSON('packages.json') || [];
  res.json(packages);
});

app.get('/api/packages/:id', (req, res) => {
  const packages = readJSON('packages.json') || [];
  const p = packages.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Package not found' });
  res.json(p);
});

app.get('/api/testimonials', (req, res) => {
  const items = readJSON('testimonials.json') || [];
  res.json(items);
});

app.get('/api/agents', (req, res) => {
  const items = readJSON('agents.json') || [];
  res.json(items);
});
app.get('/api/destinations', (req, res) => {
  const items = readJSON('destinations.json') || [];
  res.json(items);
});

app.get('/api/hotels', (req, res) => {
  const items = readJSON('hotels.json') || [];
  res.json(items);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  const contacts = readJSON('contacts.json') || [];
  const id = String(Date.now());
  contacts.push({ id, name, email, message, createdAt: new Date().toISOString() });
  writeJSON('contacts.json', contacts);
  res.json({ ok: true });
});

/* Very simple auth (development only) */
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const users = readJSON('users.json') || [];
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email exists' });
  const id = 'u' + Date.now();
  const user = { id, name, email, password };
  users.push(user);
  writeJSON('users.json', users);
  res.json({ ok: true, user: { id, name, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readJSON('users.json') || [];
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return res.status(401).json({ error: 'Invalid credentials' });
  // NOTE: no JWT for simplicity; return user object
  res.json({ ok: true, user: { id: u.id, name: u.name, email: u.email } });
});

/* static serve any frontend build if present */
const frontendBuild = path.join(__dirname, '..', 'build');
if (fs.existsSync(frontendBuild)) {
  app.use(express.static(frontendBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});