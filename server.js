const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

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
  res.json({
    reports: db.reports,
    volunteers: db.volunteers,
    donations: db.donations
  });
});

app.listen(PORT, () => {
  console.log(`SaveAnimal Nepal running on http://localhost:${PORT}`);
});
