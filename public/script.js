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
  push,
  update
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js';

// -- Firebase Config (WildSaura) ---
const firebaseConfig = {
  apiKey:            'AIzaSyCXDJrFmn-pzbqys91tj4Fruqn4tl58p9Y',
  authDomain:        'wildsaura-1ef8a.firebaseapp.com',
  databaseURL:       'https://wildsaura-1ef8a-default-rtdb.firebaseio.com',
  projectId:         'wildsaura-1ef8a',
  storageBucket:     'wildsaura-1ef8a.firebasestorage.app',
  messagingSenderId: '690017200836',
  appId:             '1:690017200836:web:a3c519752907c3f66ff791',
  measurementId:     'G-033E0CQGZ2'
};

const firebaseApp = initializeApp(firebaseConfig);
const auth        = getAuth(firebaseApp);
const rtdb        = getDatabase(firebaseApp);
getAnalytics(firebaseApp);

const ADMIN_EMAIL = 'madan123050@gmail.com';

// -- i18n --
const i18n = {
  en: {
    nav_home: 'Home', nav_report: 'Report Animal', nav_donate: 'Donate',
    nav_volunteer: 'Volunteer', nav_about: 'About', nav_stories: 'Stories',
    nav_contact: 'Contact',
    hero_title: 'Help Save Lives – Rescue Animals in Nepal',
    hero_text:  'Together, we rescue injured street animals, provide food and medical care, and build a kinder Nepal.',
    cta_report: 'Report an Animal', cta_donate: 'Donate Now', cta_volunteer: 'Join as Volunteer',
    stat_rescued: 'Animals Rescued', stat_volunteers: 'Volunteers',
    stat_donations: 'Donations (NPR)', stat_reports: 'Active Reports',
    stories_title:    'Featured Rescue Stories',
    report_title:     'Report an Injured Animal',
    report_emergency: 'Emergency Helpline: +977-9800000000'
  },
  np: {
    nav_home:      'गृहपृष्ठ',
    nav_report:    'जनावर रिपोर्ट',
    nav_donate:    'दान',
    nav_volunteer: 'स्वयंसेवक',
    nav_about:     'हामो बारेमा',
    nav_stories:   'उद्धार कथाहरू',
    nav_contact:   'सम्पर्क',
    hero_title:    'जीवन बचाऊं – नेपालका जनावर उद्धार गरौं',
    hero_text:     'हामी मिलेर घाइते सडक जनावरलाई उद्धार गर्छौं।',
    cta_report:    'जनावर रिपोर्ट गर्नुहोस्',
    cta_donate:    'अहिले दान गर्नुहोस्',
    cta_volunteer: 'स्वयंसेवक बन्नुहोस्',
    stat_rescued:    'उद्धार गरिएका जनावर',
    stat_volunteers: 'स्वयंसेवक',
    stat_donations:  'दान (रु)',
    stat_reports:    'सक्रिय रिपोर्ट',
    stories_title:   'प्रमुख उद्धार कथाहरू',
    report_title:    'घाइते जनावर रिपोर्ट',
    report_emergency:'आपत्कालीन हेल्पलाईण: +977-9800000000'
  }
};

// -- Language toggle --
let currentLang = 'en';
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'np' : 'en';
  document.getElementById('langToggle').textContent = currentLang === 'en' ? 'नेपाली' : 'English';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18n[currentLang][el.dataset.i18n] || el.textContent;
  });
});

// -- Real-time stats --
onValue(ref(rtdb, 'stats'), snap => {
  const d = snap.val() || {};
  document.getElementById('rescuedCount').textContent   = d.rescued       ?? 0;
  document.getElementById('volunteerCount').textContent = d.volunteers    ?? 0;
  document.getElementById('donationCount').textContent  = (d.donationsNpr ?? 0).toLocaleString();
  document.getElementById('reportCount').textContent    = d.activeReports ?? 0;
  // Admin summary bar
  document.getElementById('as-rescued').textContent    = d.rescued       ?? 0;
  document.getElementById('as-volunteers').textContent = d.volunteers    ?? 0;
  document.getElementById('as-donations').textContent  = (d.donationsNpr ?? 0).toLocaleString();
  document.getElementById('as-reports').textContent    = d.activeReports ?? 0;
});

// -- Login Modal --
const loginModal   = document.getElementById('loginModal');
const profileModal = document.getElementById('profileModal');

function openLoginModal()   { loginModal.style.display   = 'flex'; }
function closeLoginModal()  { loginModal.style.display   = 'none'; }
function openProfileModal() { profileModal.style.display = 'flex'; loadMyActivity(); }
function closeProfileModal(){ profileModal.style.display = 'none'; }

document.getElementById('loginNavBtn').addEventListener('click', openLoginModal);
document.getElementById('closeLoginModal').addEventListener('click', closeLoginModal);
loginModal.addEventListener('click', e => { if (e.target === loginModal) closeLoginModal(); });

document.getElementById('profileNavBtn').addEventListener('click', openProfileModal);
document.getElementById('closeProfileModal').addEventListener('click', closeProfileModal);
profileModal.addEventListener('click', e => { if (e.target === profileModal) closeProfileModal(); });

function setLoginStatus(msg, type = 'neutral') {
  const el = document.getElementById('loginModalStatus');
  el.style.display = 'block';
  el.textContent   = msg;
  el.className     = `status ${type}`;
}

// Login buttons
document.getElementById('googleLoginBtn').addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    closeLoginModal();
  } catch (e) { setLoginStatus(`Login failed: ${e.message}`, 'warning'); }
});

document.getElementById('facebookLoginBtn').addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, new FacebookAuthProvider());
    closeLoginModal();
  } catch (e) { setLoginStatus(`Login failed: ${e.message}`, 'warning'); }
});

document.getElementById('visitorLoginBtn').addEventListener('click', () => {
  updateNavUI(null, true); // visitor mode
  closeLoginModal();
});

document.getElementById('profileLogoutBtn').addEventListener('click', async () => {
  if (auth.currentUser) await signOut(auth);
  updateNavUI(null, false);
  closeProfileModal();
});

// -- Nav / Profile UI --
function updateNavUI(user, isVisitor = false) {
  const loginBtn   = document.getElementById('loginNavBtn');
  const profileBtn = document.getElementById('profileNavBtn');
  const navAvatar  = document.getElementById('navAvatar');
  const navName    = document.getElementById('navName');
  const adminSec   = document.getElementById('admin');

  if (user) {
    loginBtn.style.display   = 'none';
    profileBtn.style.display = 'flex';

    const initials = encodeURIComponent(user.displayName || 'U');
    navAvatar.src   = user.photoURL || `https://ui-avatars.com/api/?name=${initials}&background=166534&color=fff&size=40`;
    navName.textContent = user.displayName?.split(' ')[0] || 'Profile';

    // Profile modal data
    document.getElementById('profilePhoto').src         = navAvatar.src;
    document.getElementById('profileDisplayName').textContent = user.displayName || 'User';
    document.getElementById('profileEmail').textContent        = user.email || '';

    const isAdmin    = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const provider   = user.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Facebook';

    const roleBadge  = document.getElementById('profileRoleBadge');
    roleBadge.textContent = isAdmin ? '🛡️ Admin' : 'Visitor';
    roleBadge.className   = `badge ${isAdmin ? 'badge-admin' : 'badge-visitor'}`;

    document.getElementById('profileProviderBadge').textContent = provider;

    // Show / hide admin dashboard
    adminSec.style.display = isAdmin ? 'block' : 'none';
    if (isAdmin) loadAdminData();

  } else if (isVisitor) {
    loginBtn.style.display   = 'none';
    profileBtn.style.display = 'flex';

    navAvatar.src = 'https://ui-avatars.com/api/?name=Visitor&background=94a3b8&color=fff&size=40';
    navName.textContent = 'Visitor';

    document.getElementById('profilePhoto').src               = navAvatar.src;
    document.getElementById('profileDisplayName').textContent = 'Visitor';
    document.getElementById('profileEmail').textContent       = 'Guest mode';

    document.getElementById('profileRoleBadge').textContent = 'Visitor';
    document.getElementById('profileRoleBadge').className   = 'badge badge-visitor';
    document.getElementById('profileProviderBadge').textContent = '';

    adminSec.style.display = 'none';
  } else {
    loginBtn.style.display   = 'flex';
    profileBtn.style.display = 'none';
    adminSec.style.display   = 'none';
  }
}

// Auth state
onAuthStateChanged(auth, user => updateNavUI(user));

// -- My Activity (for profile modal) --
function loadMyActivity() {
  const user = auth.currentUser;
  if (!user) {
    document.getElementById('myActivityList').innerHTML =
      '<p class="no-activity">Login with Google or Facebook to track your activity.</p>';
    return;
  }

  // Reports
  onValue(ref(rtdb, 'reports'), snap => {
    const mine = [];
    snap.forEach(c => {
      const r = { key: c.key, ...c.val() };
      if (r.uid === user.uid || r.reporterEmail === user.email) mine.push(r);
    });
    document.getElementById('myReportCount').textContent = mine.length || '0';
    renderMyActivity(mine);
  }, { onlyOnce: true });

  // Donations
  onValue(ref(rtdb, 'donations'), snap => {
    let count = 0;
    snap.forEach(c => { if (c.val().uid === user.uid) count++; });
    document.getElementById('myDonationCount').textContent = count || '0';
  }, { onlyOnce: true });

  // Volunteer
  onValue(ref(rtdb, 'volunteers'), snap => {
    let found = false;
    snap.forEach(c => {
      const v = c.val();
      if (v.uid === user.uid || v.email === user.email) found = true;
    });
    document.getElementById('myVolunteerStatus').textContent = found ? '✓ Yes' : 'No';
  }, { onlyOnce: true });
}

function renderMyActivity(reports) {
  const list = document.getElementById('myActivityList');
  if (!reports.length) {
    list.innerHTML = '<p class="no-activity">You haven\'t submitted any reports yet. See an injured animal? <a href="#report">Report it!</a></p>';
    return;
  }
  list.innerHTML = reports.slice(0, 5).map(r => `
    <div class="activity-item">
      <span class="ai-icon">🐾</span>
      <div class="ai-body">
        <strong>${r.location || 'Unknown location'}</strong>
        <p>${(r.condition || '').slice(0, 70)}…</p>
        <small>${r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</small>
      </div>
      <span class="status-badge sb-${r.status || 'pending'}">${r.status || 'pending'}</span>
    </div>
  `).join('');
}

// -- Forms --
function formToObj(form) {
  return Object.fromEntries(new FormData(form).entries());
}

// Report form
document.getElementById('reportForm').addEventListener('submit', async e => {
  e.preventDefault();
  const statusEl = document.getElementById('reportStatus');
  statusEl.textContent = 'Submitting…';
  const formData = new FormData(e.target);
  const user     = auth.currentUser;
  if (user) { formData.append('uid', user.uid); formData.append('reporterEmail', user.email || ''); }
  try {
    const res = await fetch('/api/report', { method: 'POST', body: formData });
    const out = await res.json();
    statusEl.textContent = out.message || out.error;
    statusEl.className   = `form-status ${res.ok ? 'success' : 'error'}`;
    if (res.ok) e.target.reset();
  } catch (err) {
    statusEl.textContent = 'Network error. Please try again.';
    statusEl.className   = 'form-status error';
  }
});

// Donation form
document.getElementById('donationForm').addEventListener('submit', async e => {
  e.preventDefault();
  const statusEl = document.getElementById('donationStatus');
  statusEl.textContent = 'Submitting…';
  const body = formToObj(e.target);
  const user = auth.currentUser;
  if (user) { body.uid = user.uid; body.donorEmail = user.email || ''; }
  try {
    const res = await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const out = await res.json();
    statusEl.textContent = out.message || out.error;
    statusEl.className   = `form-status ${res.ok ? 'success' : 'error'}`;
    if (res.ok) e.target.reset();
  } catch (err) {
    statusEl.textContent = 'Network error. Please try again.';
    statusEl.className   = 'form-status error';
  }
});

// Volunteer form
document.getElementById('volunteerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const statusEl = document.getElementById('volunteerStatus');
  statusEl.textContent = 'Submitting…';
  const body = formToObj(e.target);
  const user = auth.currentUser;
  if (user) { body.uid = user.uid; }
  try {
    const res = await fetch('/api/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const out = await res.json();
    statusEl.textContent = out.message || out.error;
    statusEl.className   = `form-status ${res.ok ? 'success' : 'error'}`;
    if (res.ok) e.target.reset();
  } catch (err) {
    statusEl.textContent = 'Network error. Please try again.';
    statusEl.className   = 'form-status error';
  }
});

// -- Chat --
const BOT_REPLIES = {
  rescue:    'For emergency rescue, call +977-9800000000 now and share your exact location.',
  donate:    'You can donate through eSewa, Khalti, or bank transfer on our Donation page.',
  volunteer: 'Wonderful! Please fill the volunteer form and choose your preferred role.',
  default:   'Thank you for reaching SaveAnimal Nepal. Our team will respond soon.'
};

function getBotReply(text) {
  const l = text.toLowerCase();
  if (l.includes('injured') || l.includes('rescue') || l.includes('hurt')) return BOT_REPLIES.rescue;
  if (l.includes('donat'))    return BOT_REPLIES.donate;
  if (l.includes('volunteer')) return BOT_REPLIES.volunteer;
  return BOT_REPLIES.default;
}

onValue(ref(rtdb, 'messages'), snap => {
  const msgs = [];
  snap.forEach(c => msgs.push(c.val()));
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = msgs.slice(-20).map(m =>
    `<div class="msg ${m.from}"><strong>${m.from === 'bot' ? '🤖' : '👤'}:</strong> ${m.text}</div>`
  ).join('');
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

const chatBox = document.getElementById('chat');
const chatToggle = document.getElementById('chatToggle');
const chatForm = document.getElementById('chatForm');

// Chat toggle - shows/hides the chat body
chatToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const minimized = chatBox.classList.toggle('minimized');
  chatToggle.textContent = minimized ? '💬 Open Chat' : '✕ Hide';
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
  if (!chatBox.contains(e.target) && !e.target.closest('.chat-widget')) {
    if (!chatBox.classList.contains('minimized')) {
      chatBox.classList.add('minimized');
      chatToggle.textContent = '💬 Open Chat';
    }
  }
});

chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (!text) return;
  const user = auth.currentUser;
  const displayName = user?.displayName || 'user';
  await push(ref(rtdb, 'messages'), { from: 'user', text, displayName, ts: Date.now() });
  await push(ref(rtdb, 'messages'), { from: 'bot',  text: getBotReply(text), ts: Date.now() });
  e.target.reset();
});

// -- Admin Dashboard --
function loadAdminData() {
  // Reports
  onValue(ref(rtdb, 'reports'), snap => {
    const items = [];
    snap.forEach(c => items.push({ key: c.key, ...c.val() }));
    renderAdminReports(items.reverse());
  });
  // Volunteers
  onValue(ref(rtdb, 'volunteers'), snap => {
    const items = [];
    snap.forEach(c => items.push({ key: c.key, ...c.val() }));
    renderAdminVolunteers(items.reverse());
  });
  // Donations
  onValue(ref(rtdb, 'donations'), snap => {
    const items = [];
    snap.forEach(c => items.push({ key: c.key, ...c.val() }));
    renderAdminDonations(items.reverse());
  });
  // Messages
  onValue(ref(rtdb, 'messages'), snap => {
    const items = [];
    snap.forEach(c => items.push(c.val()));
    renderAdminMessages(items.reverse().slice(0, 30));
  });
}

function renderAdminReports(items) {
  const el = document.getElementById('adminReportsList');
  if (!items.length) { el.innerHTML = '<p class="empty-state">No reports yet.</p>'; return; }
  el.innerHTML = items.map(r => `
    <div class="admin-card ${r.status === 'resolved' ? 'ac-resolved' : ''}">
      <div class="ac-top">
        <strong>📍 ${r.location || '—'}</strong>
        <span class="status-badge sb-${r.status || 'pending'}">${r.status || 'pending'}</span>
      </div>
      <p class="ac-condition">${r.condition || ''}</p>
      <div class="ac-meta">
        <span>👤 ${r.name}</span>
        <span>📞 ${r.phone}</span>
        ${r.reporterEmail ? `<span>✉️ ${r.reporterEmail}</span>` : ''}
        <span>🕐 ${r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}</span>
      </div>
      ${r.image ? `<a href="${r.image}" target="_blank" class="ac-img-link">📷 View Photo</a>` : ''}
      ${r.status !== 'resolved'
        ? `<button class="btn btn-sm secondary ac-resolve-btn" data-key="${r.key}">✓ Mark Resolved</button>`
        : '<span class="resolved-label">✓ Resolved</span>'
      }
    </div>
  `).join('');

  el.querySelectorAll('.ac-resolve-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Saving…';
      await update(ref(rtdb, `reports/${btn.dataset.key}`), { status: 'resolved' });
    });
  });
}

function renderAdminVolunteers(items) {
  const el = document.getElementById('adminVolunteersList');
  if (!items.length) { el.innerHTML = '<p class="empty-state">No volunteers yet.</p>'; return; }
  el.innerHTML = items.map(v => `
    <div class="admin-card">
      <div class="ac-top">
        <strong>👤 ${v.fullName}</strong>
        <span class="status-badge sb-active">${v.role}</span>
      </div>
      <div class="ac-meta">
        <span>✉️ ${v.email}</span>
        <span>📞 ${v.phone}</span>
        <span>📅 ${v.availability || 'Flexible'}</span>
        <span>🕐 ${v.createdAt ? new Date(v.createdAt).toLocaleString() : '—'}</span>
      </div>
      ${v.reason ? `<p class="ac-condition">${v.reason}</p>` : ''}
    </div>
  `).join('');
}

function renderAdminDonations(items) {
  const el = document.getElementById('adminDonationsList');
  if (!items.length) { el.innerHTML = '<p class="empty-state">No donations yet.</p>'; return; }
  el.innerHTML = items.map(d => `
    <div class="admin-card">
      <div class="ac-top">
        <strong>💰 NPR ${Number(d.amount || 0).toLocaleString()}</strong>
        <span class="status-badge sb-active">${d.method}</span>
      </div>
      <div class="ac-meta">
        <span>👤 ${d.donorName}</span>
        ${d.donorEmail ? `<span>✉️ ${d.donorEmail}</span>` : ''}
        <span>🔄 ${d.frequency}</span>
        <span>🕐 ${d.createdAt ? new Date(d.createdAt).toLocaleString() : '—'}</span>
      </div>
    </div>
  `).join('');
}

function renderAdminMessages(items) {
  const el = document.getElementById('adminMessagesList');
  if (!items.length) { el.innerHTML = '<p class="empty-state">No messages yet.</p>'; return; }
  el.innerHTML = items.map(m => `
    <div class="admin-card msg-card msg-${m.from}">
      <span class="msg-who">${m.from === 'user' ? '👤 Visitor' : '🤖 Bot'}</span>
      <p>${m.text}</p>
      <small>🕐 ${m.ts ? new Date(m.ts).toLocaleString() : '—'}</small>
    </div>
  `).join('');
}

// Admin tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

document.getElementById('refreshAdmin').addEventListener('click', loadAdminData);
