const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'saveanimal-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

const ADMIN_EMAIL = 'madan123050@gmail.com';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value?.toLowerCase();
    return done(null, {
      id: profile.id,
      name: profile.displayName,
      email,
      provider: 'google',
      role: email === ADMIN_EMAIL ? 'admin' : 'visitor'
    });
  }));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/assets/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});
const upload = multer({ storage });

const db = {
  reports: [],
  volunteers: [],
  donations: [],
  messages: [
    {
      from: 'bot',
      text: 'Hello! Need emergency rescue help? Share location and contact number.'
    }
  ]
};

app.get('/api/stats', (req, res) => {
  res.json({
    rescued: 1284,
    volunteers: 347,
    donationsNpr: 2850000,
    activeReports: db.reports.length
  });
});

app.post('/api/report', upload.single('animalImage'), (req, res) => {
  const { name, phone, location, condition } = req.body;
  if (!name || !phone || !location || !condition) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  const report = {
    id: db.reports.length + 1,
    name,
    phone,
    location,
    condition,
    image: req.file ? `/assets/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  db.reports.push(report);
  res.json({ message: 'Report submitted successfully', report });
});

app.post('/api/volunteer', (req, res) => {
  const { fullName, email, phone, role, availability, reason } = req.body;
  if (!fullName || !email || !phone || !role) {
    return res.status(400).json({ error: 'Please complete required fields.' });
  }
  const volunteer = {
    id: db.volunteers.length + 1,
    fullName,
    email,
    phone,
    role,
    availability,
    reason,
    createdAt: new Date().toISOString()
  };
  db.volunteers.push(volunteer);
  res.json({ message: 'Volunteer application submitted', volunteer });
});

app.post('/api/donate', (req, res) => {
  const { donorName, amount, frequency, method } = req.body;
  if (!donorName || !amount || !frequency || !method) {
    return res.status(400).json({ error: 'Please fill donation details.' });
  }
  const donation = {
    id: db.donations.length + 1,
    donorName,
    amount: Number(amount),
    frequency,
    method,
    createdAt: new Date().toISOString()
  };
  db.donations.push(donation);
  res.json({ message: 'Donation intent received', donation });
});

app.post('/api/chat', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  db.messages.push({ from: 'user', text });

  const lower = text.toLowerCase();
  let reply = 'Thank you for reaching SaveAnimal Nepal. Our team will respond soon.';

  if (lower.includes('injured') || lower.includes('rescue') || lower.includes('hurt')) {
    reply = 'For emergency rescue, call +977-9800000000 now and share your exact location.';
  } else if (lower.includes('donate')) {
    reply = 'You can donate through eSewa, Khalti, or bank transfer on our Donation page.';
  } else if (lower.includes('volunteer')) {
    reply = 'Wonderful! Please fill the volunteer form and choose your preferred role.';
  }

  const botMsg = { from: 'bot', text: reply };
  db.messages.push(botMsg);

  res.json({ reply, messages: db.messages.slice(-8) });
});

app.get('/api/admin', (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only.' });
  }
  res.json({
    reports: db.reports,
    volunteers: db.volunteers,
    donations: db.donations
  });
});

app.post('/api/login/visitor', (req, res) => {
  req.login({ role: 'visitor', provider: 'guest' }, (err) => {
    if (err) return res.status(500).json({ error: 'Could not login as visitor.' });
    return res.json({ message: 'Visitor login successful', user: req.user });
  });
});

app.get('/api/auth/status', (req, res) => {
  if (!req.user) return res.json({ authenticated: false });
  res.json({ authenticated: true, user: req.user });
});

app.post('/api/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({ message: 'Logged out' });
    });
  });
});

app.get('/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.redirect('/?authError=google_not_configured');
  }
  return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/?authError=google_failed' }),
  (req, res) => {
    res.redirect('/#login');
  }
);

app.listen(PORT, () => {
  console.log(`SaveAnimal Nepal running on http://localhost:${PORT}`);
});
