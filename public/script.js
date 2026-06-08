import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import {
  getDatabase,
  ref,
  onValue,
  push
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js';

// ── Firebase Config (WildSaura) ───────────────────────────────────────────────
const firebaseConfig = {
  apiKey: 'AIzaSyCXDJrFmn-pzbqys91tj4Fruqn4tl58p9Y',
  authDomain: 'wildsaura-1ef8a.firebaseapp.com',
  databaseURL: 'https://wildsaura-1ef8a-default-rtdb.firebaseio.com',
  projectId: 'wildsaura-1ef8a',
  storageBucket: 'wildsaura-1ef8a.firebasestorage.app',
  messagingSenderId: '690017200836',
  appId: '1:690017200836:web:a3c519752907c3f66ff791',
  measurementId: 'G-033E0CQGZ2'
};

const firebaseApp = initializeApp(firebaseConfig);
const auth        = getAuth(firebaseApp);
const rtdb        = getDatabase(firebaseApp);
const analytics   = getAnalytics(firebaseApp); // eslint-disable-line no-unused-vars

// ── i18n ──────────────────────────────────────────────────────────────────────
const i18n = {
  en: {
    nav_home: 'Home', nav_report: 'Report Animal', nav_donate: 'Donate',
    nav_volunteer: 'Volunteer', nav_about: 'About', nav_stories: 'Stories',
    nav_contact: 'Contact', nav_admin: 'Admin',
    hero_title: 'Help Save Lives \u2013 Rescue Animals in Nepal',
    hero_text: 'Together, we rescue injured street animals, provide food and medical care, and build a kinder Nepal.',
    cta_report: 'Report an Animal', cta_donate: 'Donate Now', cta_volunteer: 'Join as Volunteer',
    stat_rescued: 'Animals Rescued', stat_volunteers: 'Volunteers',
    stat_donations: 'Donations (NPR)', stat_reports: 'Active Reports',
    stories_title: 'Featured Rescue Stories',
    report_title: 'Report an Injured Animal (Helpline)',
    report_emergency: 'Emergency Helpline: +977-9800000000'
  },
  np: {
    nav_home: '\u0917\u0943\u0939\u092a\u0943\u0937\u094d\u0920',
    nav_report: '\u091c\u0928\u093e\u0935\u0930 \u0930\u093f\u092a\u094b\u0930\u094d\u091f',
    nav_donate: '\u0926\u093e\u0928',
    nav_volunteer: '\u0938\u094d\u0935\u092f\u0902\u0938\u0947\u0935\u0915',
    nav_about: '\u0939\u093e\u092e\u094d\u0930\u094b \u092c\u093e\u0930\u0947\u092e\u093e',
    nav_stories: '\u0909\u0926\u094d\u0927\u093e\u0930 \u0915\u0925\u093e\u0939\u0930\u0942',
    nav_contact: '\u0938\u092e\u094d\u092a\u0930\u094d\u0915',
    nav_admin: '\u090f\u0921\u092e\u093f\u0928',
    hero_title: '\u091c\u0940\u0935\u0928 \u092c\u091a\u093e\u0914\u0902 \u2013 \u0928\u0947\u092a\u093e\u0932\u0915\u093e \u091c\u0928\u093e\u0935\u0930 \u0909\u0926\u094d\u0927\u093e\u0930 \u0917\u0930\u094c\u0902',
    hero_text: '\u0939\u093e\u092e\u0940 \u092e\u093f\u0932\u0947\u0930 \u0918\u093e\u0907\u0924\u0947 \u0938\u0921\u0915 \u091c\u0928\u093e\u0935\u0930\u0932\u093e\u0908 \u0909\u0926\u094d\u0927\u093e\u0930, \u0916\u093e\u0928\u093e \u0930 \u0909\u092a\u091a\u093e\u0930 \u0909\u092a\u0932\u092c\u094d\u0927 \u0917\u0930\u093e\u0909\u0901\u091b\u094c\u0902\u0964',
    cta_report: '\u091c\u0928\u093e\u0935\u0930 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    cta_donate: '\u0905\u0939\u093f\u0932\u0947 \u0926\u093e\u0928 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    cta_volunteer: '\u0938\u094d\u0935\u092f\u0902\u0938\u0947\u0935\u0915 \u092c\u0928\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    stat_rescued: '\u0909\u0926\u094d\u0927\u093e\u0930 \u0917\u0930\u093f\u090f\u0915\u093e \u091c\u0928\u093e\u0935\u0930',
    stat_volunteers: '\u0938\u094d\u0935\u092f\u0902\u0938\u0947\u0935\u0915',
    stat_donations: '\u0926\u093e\u0928 (\u0930\u0941)',
    stat_reports: '\u0938\u0915\u094d\u0930\u093f\u092f \u0930\u093f\u092a\u094b\u0930\u094d\u091f',
    stories_title: '\u092a\u094d\u0930\u092e\u0941\u0916 \u0909\u0926\u094d\u0927\u093e\u0930 \u0915\u0925\u093e\u0939\u0930\u0942',
    report_title: '\u0918\u093e\u0907\u0924\u0947 \u091c\u0928\u093e\u0935\u0930 \u0930\u093f\u092a\u094b\u0930\u094d\u091f (\u0939\u0947\u0932\u094d\u092a\u0932\u093e\u0907\u0928)',
    report_emergency: '\u0906\u092a\u0924\u0915\u093e\u0932\u0940\u0928 \u0939\u0947\u0932\u094d\u092a\u0932\u093e\u0907\u0928: +977-9800000000'
  }
};

const ADMIN_EMAIL = 'madan123050@gmail.com';

// ── DOM refs ──────────────────────────────────────────────────────────────────
let currentLang = 'en';
const langToggle    = document.getElementById('langToggle');
const chatMessages  = document.getElementById('chatMessages');
const chatBox       = document.getElementById('chat');
const chatToggle    = document.getElementById('chatToggle');
const adminSection  = document.getElementById('admin');
const loginStatus   = document.getElementById('loginStatus');
const loginCard     = document.getElementById('login');

// ── Language toggle ───────────────────────────────────────────────────────────
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'np' : 'en';
  langToggle.textContent = currentLang === 'en' ? '\u0928\u0947\u092a\u093e\u0932\u0940' : 'English';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = i18n[currentLang][el.dataset.i18n] || el.textContent;
  });
});

// ── Auth helpers ──────────────────────────────────────────────────────────────
function setStatus(text, type = 'neutral') {
  loginStatus.textContent = text;
  loginStatus.className = `status ${type}`;
}

function updateAccessUI(user = null, provider = 'Guest') {
  if (user && user.email?.toLowerCase() === ADMIN_EMAIL) {
    adminSection.style.display = 'block';
    setStatus(`Welcome admin (${user.email}). Admin dashboard unlocked.`, 'success');
  } else {
    adminSection.style.display = 'none';
    if (user) {
      setStatus(`Logged in as visitor via ${provider}${user.email ? ` (${user.email})` : ''}.`, 'neutral');
    } else {
      setStatus('Choose Visitor, Google, or Facebook login to continue.', 'neutral');
    }
  }
}

// ── Real-time stats from Firebase RTDB ───────────────────────────────────────
onValue(ref(rtdb, 'stats'), (snap) => {
  const data = snap.val() || {};
  document.getElementById('rescuedCount').textContent  = data.rescued      ?? 0;
  document.getElementById('volunteerCount').textContent = data.volunteers   ?? 0;
  document.getElementById('donationCount').textContent  = (data.donationsNpr ?? 0).toLocaleString();
  document.getElementById('reportCount').textContent    = data.activeReports ?? 0;
});

// ── Form helpers ──────────────────────────────────────────────────────────────
function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

// ── Report form (server API handles file upload) ──────────────────────────────
document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res  = await fetch('/api/report', { method: 'POST', body: formData });
  const out  = await res.json();
  document.getElementById('reportStatus').textContent = out.message || out.error;
  if (res.ok) e.target.reset();
});

// ── Donation form ─────────────────────────────────────────────────────────────
document.getElementById('donationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/donate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formToObject(e.target))
  });
  const out = await res.json();
  document.getElementById('donationStatus').textContent = out.message || out.error;
  if (res.ok) e.target.reset();
});

// ── Volunteer form ────────────────────────────────────────────────────────────
document.getElementById('volunteerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/volunteer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formToObject(e.target))
  });
  const out = await res.json();
  document.getElementById('volunteerStatus').textContent = out.message || out.error;
  if (res.ok) e.target.reset();
});

// ── Real-time chat via Firebase RTDB ─────────────────────────────────────────
const BOT_REPLIES = {
  rescue:    'For emergency rescue, call +977-9800000000 now and share your exact location.',
  donate:    'You can donate through eSewa, Khalti, or bank transfer on our Donation page.',
  volunteer: 'Wonderful! Please fill the volunteer form and choose your preferred role.',
  default:   'Thank you for reaching SaveAnimal Nepal. Our team will respond soon.'
};

function getBotReply(text) {
  const l = text.toLowerCase();
  if (l.includes('injured') || l.includes('rescue') || l.includes('hurt')) return BOT_REPLIES.rescue;
  if (l.includes('donate'))    return BOT_REPLIES.donate;
  if (l.includes('volunteer')) return BOT_REPLIES.volunteer;
  return BOT_REPLIES.default;
}

// Listen for real-time messages (last 20)
onValue(ref(rtdb, 'messages'), (snap) => {
  const msgs = [];
  snap.forEach((child) => msgs.push(child.val()));
  chatMessages.innerHTML = msgs
    .slice(-20)
    .map((m) => `<div class="msg ${m.from}"><strong>${m.from}:</strong> ${m.text}</div>`)
    .join('');
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (!text) return;
  await push(ref(rtdb, 'messages'), { from: 'user', text, ts: Date.now() });
  await push(ref(rtdb, 'messages'), { from: 'bot',  text: getBotReply(text), ts: Date.now() });
  e.target.reset();
});

chatToggle.addEventListener('click', () => {
  const minimized = chatBox.classList.toggle('minimized');
  chatToggle.textContent = minimized ? 'Open Quick Help' : 'Hide';
});

// ── Login ─────────────────────────────────────────────────────────────────────
document.getElementById('visitorLogin').addEventListener('click', () => {
  updateAccessUI({ email: null }, 'Visitor');
});

async function loginWithProvider(provider, providerName) {
  try {
    const result = await signInWithPopup(auth, provider);
    updateAccessUI(result.user, providerName);
  } catch (error) {
    setStatus(`Login failed: ${error.message}`, 'warning');
  }
}

document.getElementById('googleLogin').addEventListener('click', () =>
  loginWithProvider(new GoogleAuthProvider(), 'Google'));

document.getElementById('socialLogin').addEventListener('click', () =>
  loginWithProvider(new FacebookAuthProvider(), 'Facebook'));

document.getElementById('logoutBtn').addEventListener('click', async () => {
  if (auth.currentUser) await signOut(auth);
  updateAccessUI(null);
});

// ── Admin dashboard – live read from Firebase ─────────────────────────────────
document.getElementById('refreshAdmin').addEventListener('click', () => {
  onValue(ref(rtdb, '/'), (snap) => {
    const data = snap.val() || {};
    document.getElementById('adminData').textContent = JSON.stringify({
      reports:    data.reports    ? Object.values(data.reports)    : [],
      volunteers: data.volunteers ? Object.values(data.volunteers) : [],
      donations:  data.donations  ? Object.values(data.donations)  : []
    }, null, 2);
  }, { onlyOnce: true });
});

// ── Auth state listener ───────────────────────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  if (user) {
    const provider = user.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Facebook';
    updateAccessUI(user, provider);
  } else {
    updateAccessUI(null);
  }
});

loginCard.classList.add('enhanced-login');
