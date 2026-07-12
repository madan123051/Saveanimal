const express = require('express');
const path = require('path');
const multer = require('multer');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 3000;

let db = null;
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://wildsaura-1ef8a-default-rtdb.firebaseio.com',
    storageBucket: 'wildsaura-1ef8a.firebasestorage.app'
  });
  db = admin.database();
  db.ref('stats').once('value', (snap) => {
    if (!snap.exists()) db.ref('stats').set({ rescued:1284, volunteers:347, donationsNpr:2850000, activeReports:0 });
  });
  db.ref('messages').once('value', (snap) => {
    if (!snap.exists()) db.ref('messages').push({ from:'bot', text:'Hello! Need emergency rescue help? Share location and contact number.', ts:Date.now() });
  });
} catch (error) {
  console.warn('Firebase credentials not available. Public site will run with browser/local fallback data.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, path.join(__dirname, 'public/assets/uploads')); },
  filename:    (req, file, cb) => { cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g,'-')}`); }
});
const upload = multer({ storage });

// ── Auth middleware ────────────────────────────────────────────────────────────
async function verifyToken(req, res, next) {
  const hdr = req.headers.authorization || '';
  const tok = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!tok) return res.status(401).json({ error:'Unauthorized — no token' });
  try {
    req.firebaseUser = await admin.auth().verifyIdToken(tok);
    next();
  } catch (e) { res.status(401).json({ error:'Invalid or expired token' }); }
}

async function requireAdmin(req, res, next) {
  const snap = await db.ref(`userRoles/${req.firebaseUser.uid}`).once('value');
  if (snap.val() !== 'admin') return res.status(403).json({ error:'Admin access required' });
  next();
}

// ── Role API ───────────────────────────────────────────────────────────────────

// GET /api/user/role — returns the calling user's role
app.get('/api/user/role', verifyToken, async (req, res) => {
  try {
    const snap = await db.ref(`userRoles/${req.firebaseUser.uid}`).once('value');
    res.json({ uid: req.firebaseUser.uid, role: snap.val() || 'user' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/admin/setrole  body: { uid, role }
app.post('/api/admin/setrole', verifyToken, requireAdmin, async (req, res) => {
  const { uid, role } = req.body;
  if (!uid || !['admin','volunteer','user','visitor'].includes(role))
    return res.status(400).json({ error:'uid and valid role required' });
  try {
    await db.ref(`userRoles/${uid}`).set(role);
    res.json({ message:'Role updated', uid, role });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/admin/users — list all users with roles
app.get('/api/admin/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const [rolesSnap, list] = await Promise.all([
      db.ref('userRoles').once('value'),
      admin.auth().listUsers(1000)
    ]);
    const roles = rolesSnap.val() || {};
    const users = list.users.map(u => ({
      uid:   u.uid,
      email: u.email || '',
      name:  u.displayName || '',
      photo: u.photoURL || null,
      role:  roles[u.uid] || 'user'
    }));
    res.json({ users });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Public API ─────────────────────────────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
  try {
    const snap = await db.ref('stats').once('value');
    res.json(snap.val() || { rescued:0, volunteers:0, donationsNpr:0, activeReports:0 });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/report', upload.single('animalImage'), async (req, res) => {
  const { name, phone, location, condition } = req.body;
  if (!name||!phone||!location||!condition) return res.status(400).json({ error:'All required fields must be filled.' });
  const report = { name, phone, location, condition, image: req.file ? `/assets/uploads/${req.file.filename}` : null, createdAt:new Date().toISOString(), status:'pending' };
  try {
    await db.ref('reports').push(report);
    await db.ref('stats/activeReports').transaction((n) => (n||0)+1);
    res.json({ message:'Report submitted successfully', report });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/volunteer', async (req, res) => {
  const { fullName, email, phone, role, availability, reason } = req.body;
  if (!fullName||!email||!phone||!role) return res.status(400).json({ error:'Please complete required fields.' });
  const volunteer = { fullName, email, phone, role, availability:availability||'', reason:reason||'', createdAt:new Date().toISOString() };
  try {
    await db.ref('volunteers').push(volunteer);
    await db.ref('stats/volunteers').transaction((n) => (n||0)+1);
    res.json({ message:'Volunteer application submitted', volunteer });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/donate', async (req, res) => {
  const { donorName, amount, frequency, method } = req.body;
  if (!donorName||!amount||!frequency||!method) return res.status(400).json({ error:'Please fill donation details.' });
  const donation = { donorName, amount:Number(amount), frequency, method, createdAt:new Date().toISOString() };
  try {
    await db.ref('donations').push(donation);
    await db.ref('stats/donationsNpr').transaction((n) => (n||0)+Number(amount));
    res.json({ message:'Donation intent received', donation });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/chat', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error:'Message text is required.' });
  const lower = text.toLowerCase();
  let reply = 'Thank you for reaching SaveAnimal Nepal. Our team will respond soon.';
  if (lower.includes('injured')||lower.includes('rescue')||lower.includes('hurt'))
    reply = 'For emergency rescue, call +977-9800000000 and share your location.';
  else if (lower.includes('donate'))    reply = 'Donate via eSewa, Khalti, or bank transfer on our Donation page.';
  else if (lower.includes('volunteer')) reply = 'Fill the volunteer form and choose your role!';
  try {
    await db.ref('messages').push({ from:'user', text, ts:Date.now() });
    await db.ref('messages').push({ from:'bot', text:reply, ts:Date.now() });
    const snap = await db.ref('messages').limitToLast(8).once('value');
    const messages = [];
    snap.forEach((c) => messages.push(c.val()));
    res.json({ reply, messages });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/admin', async (req, res) => {
  try {
    const [rSnap, vSnap, dSnap] = await Promise.all([
      db.ref('reports').once('value'), db.ref('volunteers').once('value'), db.ref('donations').once('value')
    ]);
    res.json({
      reports:    rSnap.val() ? Object.values(rSnap.val()) : [],
      volunteers: vSnap.val() ? Object.values(vSnap.val()) : [],
      donations:  dSnap.val() ? Object.values(dSnap.val()) : []
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => { console.log(`SaveAnimal Nepal running on http://localhost:${PORT}`); });
