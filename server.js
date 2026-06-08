const express = require('express');
const path = require('path');
const multer = require('multer');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Firebase Admin SDK ────────────────────────────────────────────────────────
// Auth options (pick one):
//   A) Local dev  : run `firebase login` then `firebase use wildsaura-1ef8a`
//   B) Production : set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://wildsaura-1ef8a-default-rtdb.firebaseio.com',
  storageBucket: 'wildsaura-1ef8a.firebasestorage.app'
});

const db = admin.database();

// ── Seed defaults on first run ────────────────────────────────────────────────
db.ref('stats').once('value', (snap) => {
  if (!snap.exists()) {
    db.ref('stats').set({
      rescued: 1284,
      volunteers: 347,
      donationsNpr: 2850000,
      activeReports: 0
    });
  }
});

db.ref('messages').once('value', (snap) => {
  if (!snap.exists()) {
    db.ref('messages').push({
      from: 'bot',
      text: 'Hello! Need emergency rescue help? Share location and contact number.',
      ts: Date.now()
    });
  }
});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/assets/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});
const upload = multer({ storage });

// ── GET /api/stats ────────────────────────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
  try {
    const snap = await db.ref('stats').once('value');
    res.json(snap.val() || { rescued: 0, volunteers: 0, donationsNpr: 0, activeReports: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/report ──────────────────────────────────────────────────────────
app.post('/api/report', upload.single('animalImage'), async (req, res) => {
  const { name, phone, location, condition } = req.body;
  if (!name || !phone || !location || !condition) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }
  const report = {
    name, phone, location, condition,
    image: req.file ? `/assets/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  try {
    await db.ref('reports').push(report);
    await db.ref('stats/activeReports').transaction((n) => (n || 0) + 1);
    res.json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/volunteer ───────────────────────────────────────────────────────
app.post('/api/volunteer', async (req, res) => {
  const { fullName, email, phone, role, availability, reason } = req.body;
  if (!fullName || !email || !phone || !role) {
    return res.status(400).json({ error: 'Please complete required fields.' });
  }
  const volunteer = {
    fullName, email, phone, role,
    availability: availability || '',
    reason: reason || '',
    createdAt: new Date().toISOString()
  };
  try {
    await db.ref('volunteers').push(volunteer);
    await db.ref('stats/volunteers').transaction((n) => (n || 0) + 1);
    res.json({ message: 'Volunteer application submitted', volunteer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/donate ──────────────────────────────────────────────────────────
app.post('/api/donate', async (req, res) => {
  const { donorName, amount, frequency, method } = req.body;
  if (!donorName || !amount || !frequency || !method) {
    return res.status(400).json({ error: 'Please fill donation details.' });
  }
  const donation = {
    donorName,
    amount: Number(amount),
    frequency, method,
    createdAt: new Date().toISOString()
  };
  try {
    await db.ref('donations').push(donation);
    await db.ref('stats/donationsNpr').transaction((n) => (n || 0) + Number(amount));
    res.json({ message: 'Donation intent received', donation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/chat ────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Message text is required.' });

  const lower = text.toLowerCase();
  let reply = 'Thank you for reaching SaveAnimal Nepal. Our team will respond soon.';
  if (lower.includes('injured') || lower.includes('rescue') || lower.includes('hurt')) {
    reply = 'For emergency rescue, call +977-9800000000 now and share your exact location.';
  } else if (lower.includes('donate')) {
    reply = 'You can donate through eSewa, Khalti, or bank transfer on our Donation page.';
  } else if (lower.includes('volunteer')) {
    reply = 'Wonderful! Please fill the volunteer form and choose your preferred role.';
  }

  try {
    await db.ref('messages').push({ from: 'user', text, ts: Date.now() });
    await db.ref('messages').push({ from: 'bot', text: reply, ts: Date.now() });
    const snap = await db.ref('messages').limitToLast(8).once('value');
    const messages = [];
    snap.forEach((child) => messages.push(child.val()));
    res.json({ reply, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/admin ────────────────────────────────────────────────────────────
app.get('/api/admin', async (req, res) => {
  try {
    const [rSnap, vSnap, dSnap] = await Promise.all([
      db.ref('reports').once('value'),
      db.ref('volunteers').once('value'),
      db.ref('donations').once('value')
    ]);
    res.json({
      reports:    rSnap.val() ? Object.values(rSnap.val()) : [],
      volunteers: vSnap.val() ? Object.values(vSnap.val()) : [],
      donations:  dSnap.val() ? Object.values(dSnap.val()) : []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`SaveAnimal Nepal running on http://localhost:${PORT}`);
});
