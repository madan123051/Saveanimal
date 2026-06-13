// ============ INITIALIZATION ============
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('saveanimal_user');
  if (savedUser) {
    try { currentUser = JSON.parse(savedUser); updateUIForUser(); }
    catch (e) { console.error('Failed to load user:', e); localStorage.removeItem('saveanimal_user'); }
  }
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  document.documentElement.lang = savedLang;
  updateLanguageToggleButton(savedLang);
  if (savedLang === 'ne') applyTranslations('ne');
  setupEventListeners();
  updatePageStats();
  setupFormSubmissions();
});

function setupEventListeners() {
  document.getElementById('loginNavBtn')?.addEventListener('click', () => openModal('loginModal'));
  document.getElementById('closeLoginModal')?.addEventListener('click', () => closeModal('loginModal'));
  document.getElementById('closeProfileModal')?.addEventListener('click', () => closeModal('profileModal'));
  document.getElementById('profileLogoutBtn')?.addEventListener('click', handleLogout);
  document.getElementById('profileNavBtn')?.addEventListener('click', () => openModal('profileModal'));
  document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);
  document.getElementById('chatToggle')?.addEventListener('click', toggleChat);
  document.getElementById('chatForm')?.addEventListener('submit', handleChatSubmit);

  // Login form submission
  document.getElementById('loginForm')?.addEventListener('submit', handleLoginFormSubmit);

  // Role buttons in login modal
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('loginRoleInput').value = btn.dataset.role;
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
  });
}

function handleLoginFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('loginNameInput').value.trim();
  const email = document.getElementById('loginEmailInput').value.trim();
  const role = document.getElementById('loginRoleInput').value || 'visitor';

  if (!name || !email) {
    showStatus('loginModalStatus', 'Please enter your name and email.', 'error');
    return;
  }

  const avatarMap = { volunteer: '🤝', admin: '🛡️', visitor: '👤' };
  const userData = {
    id: role.toUpperCase().slice(0,3) + '-' + Date.now(),
    role,
    name,
    email,
    avatar: avatarMap[role] || '👤',
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('saveanimal_user', JSON.stringify(userData));
  localStorage.setItem('saveanimal_currentUser', JSON.stringify(userData));
  currentUser = userData;

  if (role === 'volunteer' || role === 'admin') {
    closeModal('loginModal');
    showStatus('loginModalStatus', `Welcome ${name}! Redirecting to dashboard...`, 'success');
    setTimeout(() => { window.location.href = '/dashboard/index.html'; }, 1200);
  } else {
    updateUIForUser();
    closeModal('loginModal');
    openModal('profileModal');
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('saveanimal_user');
    localStorage.removeItem('saveanimal_currentUser');
    currentUser = null; updateUIForUser(); closeModal('profileModal');
    showStatus('profileModal', 'You have been logged out', 'success', 2000);
  }
}

function updateUIForUser() {
  const loginBtn = document.getElementById('loginNavBtn');
  const profileBtn = document.getElementById('profileNavBtn');
  const adminSection = document.getElementById('admin');
  if (!currentUser) {
    loginBtn?.style.removeProperty('display');
    profileBtn?.style.setProperty('display','none','important');
    if (adminSection) adminSection.style.display = 'none';
    updateProfileModal(); return;
  }
  loginBtn?.style.setProperty('display','none','important');
  profileBtn?.style.removeProperty('display');
  const navAvatar = document.getElementById('navAvatar');
  const navName = document.getElementById('navName');
  if (navAvatar) navAvatar.textContent = currentUser.avatar || '👤';
  if (navName) navName.textContent = currentUser.name?.split(' ')[0] || 'User';
  if (currentUser.role === 'admin' && adminSection) { adminSection.style.display = 'block'; updateAdminPanel(); }
  updateProfileModal();
}

function updateProfileModal() {
  const els = {
    displayName: document.getElementById('profileDisplayName'),
    email: document.getElementById('profileEmail'),
    roleBadge: document.getElementById('profileRoleBadge'),
    profilePhoto: document.getElementById('profilePhoto')
  };
  if (!currentUser) {
    if (els.displayName) els.displayName.textContent = 'Not Logged In';
    if (els.email) els.email.textContent = 'Login to view profile';
    if (els.roleBadge) { els.roleBadge.textContent = 'Guest'; els.roleBadge.className = 'badge badge-info'; }
    return;
  }
  if (els.displayName) els.displayName.textContent = currentUser.name || 'User';
  if (els.email) els.email.textContent = currentUser.email || 'No email';
  if (els.profilePhoto) els.profilePhoto.textContent = currentUser.avatar || '👤';
  const roleMap = { admin: 'error', volunteer: 'success', visitor: 'info' };
  if (els.roleBadge) {
    els.roleBadge.textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    els.roleBadge.className = `badge badge-${roleMap[currentUser.role]||'info'}`;
  }
  const rc = document.getElementById('myReportCount'), dc = document.getElementById('myDonationCount'), vs = document.getElementById('myVolunteerStatus');
  if (currentUser.role === 'volunteer') { if (rc) rc.textContent = '0'; if (vs) vs.textContent = '✓ Active'; if (dc) dc.textContent = '—'; }
  else if (currentUser.role === 'admin') { if (rc) rc.textContent = '0'; if (dc) dc.textContent = '0'; if (vs) vs.textContent = 'Admin'; }
  else { if (rc) rc.textContent = '—'; if (dc) dc.textContent = '—'; if (vs) vs.textContent = '—'; }
  const al = document.getElementById('myActivityList');
  if (al) {
    if (currentUser.role === 'volunteer') al.innerHTML = `<div class="activity-item"><span>🤝</span><div><strong>Volunteer Account</strong><small>Go to dashboard for full details</small></div></div>`;
    else if (currentUser.role === 'admin') al.innerHTML = `<div class="activity-item"><span>🛡️</span><div><strong>Admin Access</strong><small>View dashboard for full stats</small></div></div>`;
    else al.innerHTML = `<div class="activity-item"><span>📝</span><div><strong>Visitor Mode</strong><small>Report animals and view our work</small></div></div>`;
  }
}

function updatePageStats() {
  try {
    const reports = JSON.parse(localStorage.getItem('rescueReports')||'[]');
    const donations = JSON.parse(localStorage.getItem('donations')||'[]');
    const volunteers = JSON.parse(localStorage.getItem('volunteers')||'[]');
    const e = (id) => document.getElementById(id);
    if (e('rescuedCount')) e('rescuedCount').textContent = Math.floor(reports.length*2.5)||0;
    if (e('volunteerCount')) e('volunteerCount').textContent = volunteers.length||0;
    if (e('donationCount')) e('donationCount').textContent = donations.reduce((s,d)=>s+(parseInt(d.amount)||0),0)||0;
    if (e('reportCount')) e('reportCount').textContent = reports.length||0;
  } catch(e) { console.error('Error updating stats:',e); }
}

function setupFormSubmissions() {
  document.getElementById('reportForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const report = { id:'RESCUE-'+Date.now(), name:f.get('name'), phone:f.get('phone'), location:f.get('location'), condition:f.get('condition'), timestamp:new Date().toISOString(), status:'Pending' };
    let reports = JSON.parse(localStorage.getItem('rescueReports')||'[]');
    reports.push(report); localStorage.setItem('rescueReports', JSON.stringify(reports));
    showStatus('reportStatus','✓ Report submitted! Our team will respond soon.','success'); e.target.reset(); updatePageStats();
  });
  document.getElementById('donationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const donation = { id:'DONATION-'+Date.now(), donor:f.get('donorName'), amount:f.get('amount'), frequency:f.get('frequency'), method:f.get('method'), timestamp:new Date().toISOString() };
    let donations = JSON.parse(localStorage.getItem('donations')||'[]');
    donations.push(donation); localStorage.setItem('donations', JSON.stringify(donations));
    showStatus('donationStatus',`✓ Thank you! Donation of NPR ${donation.amount} recorded.`,'success'); e.target.reset(); updatePageStats();
  });
  document.getElementById('volunteerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const volunteer = { id:'VOL-'+Date.now(), name:f.get('fullName'), email:f.get('email'), phone:f.get('phone'), role:f.get('role'), availability:f.get('availability'), reason:f.get('reason'), joinDate:new Date().toISOString(), status:'Pending' };
    let volunteers = JSON.parse(localStorage.getItem('volunteers')||'[]');
    volunteers.push(volunteer); localStorage.setItem('volunteers', JSON.stringify(volunteers));
    showStatus('volunteerStatus','\u2713 Welcome! We\'ll contact you soon.','success'); e.target.reset(); updatePageStats();
  });
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[name="text"]');
  const message = input.value.trim();
  if (!message) return;
  const div = document.getElementById('chatMessages');
  const userMsg = document.createElement('div'); userMsg.className = 'chat-msg user-msg'; userMsg.textContent = message; div.appendChild(userMsg);
  setTimeout(() => {
    const botMsg = document.createElement('div'); botMsg.className = 'chat-msg bot-msg';
    const r = ['🐾 How can I help you today?','That\'s a great question! 💙','We\'re here to help! 🐾','Thank you! 🙏 Contact us via email.','You can report animals via our form. 📝'];
    botMsg.textContent = r[Math.floor(Math.random()*r.length)]; div.appendChild(botMsg); div.scrollTop = div.scrollHeight;
  }, 500);
  input.value = ''; div.scrollTop = div.scrollHeight;
}

function toggleChat() {
  const w = document.getElementById('chat'); w.classList.toggle('minimized');
  document.getElementById('chatToggle').textContent = w.classList.contains('minimized') ? '💬 Open Chat' : '💬 Close Chat';
}

// ============ LANGUAGE ============
const translations = {
  en: { nav_home:'Home', nav_stories:'Stories', nav_report:'Report', nav_donate:'Donate', nav_volunteer:'Volunteer', nav_about:'About', nav_contact:'Contact', hero_title:'Help Save Lives –<br>Rescue Animals in Nepal', hero_text:'Together, we rescue injured street animals, provide food and medical care, and build a kinder Nepal.', cta_report:'Report an Animal', cta_donate:'Donate Now', cta_volunteer:'Join as Volunteer', stat_rescued:'Animals Rescued', stat_volunteers:'Volunteers', stat_donations:'Donations (NPR)', stat_reports:'Active Reports', stories_title:'Featured Rescue Stories', report_title:'Report an Injured Animal' },
  ne: { nav_home:'गृहपृष्ठ', nav_stories:'कथाहरू', nav_report:'रिपोर्ट', nav_donate:'दान दिनुहोस्', nav_volunteer:'स्वयंसेवक', nav_about:'हाम्रोबारे', nav_contact:'सम्पर्क', hero_title:'जीवन बचाउन मद्दत गर्नुस् –<br>नेपालमा जनावरहरू उद्धार गर्नुस्', hero_text:'हामी मिलेर घाइते सडक जनावरहरू उद्धार गर्छौं, खाना र औषधि उपचार प्रदान गर्छौं, र दयालु नेपाल निर्माण गर्छौं।', cta_report:'जनावर रिपोर्ट गर्नुस्', cta_donate:'अहिले दान दिनुस्', cta_volunteer:'स्वयंसेवकको रूपमा जोडिनुस्', stat_rescued:'उद्धार गरिएका जनावरहरू', stat_volunteers:'स्वयंसेवकहरू', stat_donations:'दान (NPR)', stat_reports:'सक्रिय रिपोर्टहरू', stories_title:'विशेष उद्धार कथाहरू', report_title:'घाइते जनावर रिपोर्ट गर्नुस्' }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang]?.[key]) el.innerHTML = translations[lang][key];
  });
}

function toggleLanguage() {
  const currentLang = document.documentElement.lang || 'en';
  const newLang = currentLang === 'en' ? 'ne' : 'en';
  document.documentElement.lang = newLang;
  localStorage.setItem('preferredLanguage', newLang);
  updateLanguageToggleButton(newLang);
  applyTranslations(newLang);
}

function updateLanguageToggleButton(lang) {
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'en' ? 'नेपाली' : 'English';
}

function updateAdminPanel() {
  try {
    const reports = JSON.parse(localStorage.getItem('rescueReports')||'[]');
    const volunteers = JSON.parse(localStorage.getItem('volunteers')||'[]');
    const donations = JSON.parse(localStorage.getItem('donations')||'[]');
    const e = (id) => document.getElementById(id);
    if (e('as-rescued')) e('as-rescued').textContent = reports.length*3||0;
    if (e('as-volunteers')) e('as-volunteers').textContent = volunteers.length||0;
    if (e('as-donations')) e('as-donations').textContent = donations.reduce((s,d)=>s+(parseInt(d.amount)||0),0)||0;
    if (e('as-reports')) e('as-reports').textContent = reports.filter(r=>r.status==='Pending').length||0;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab)?.classList.add('active');
      });
    });
  } catch(e) { console.error('Admin panel error:',e); }
}

function openModal(id) { const m=document.getElementById(id); if(m) m.style.display='flex'; }
function closeModal(id) { const m=document.getElementById(id); if(m) m.style.display='none'; }
function showStatus(elementId, message, type='info', duration=3000) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message; el.className = `status ${type}`; el.style.display = 'block';
  if (duration > 0) setTimeout(() => { el.style.display='none'; }, duration);
}
