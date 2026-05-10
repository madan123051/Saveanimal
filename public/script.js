const i18n = {
  en: {
    nav_home: 'Home', nav_report: 'Report Animal', nav_donate: 'Donate', nav_volunteer: 'Volunteer', nav_stories: 'Stories', nav_contact: 'Contact',
    hero_title: 'Help Save Lives – Rescue Animals in Nepal',
    hero_text: 'Together, we rescue injured street animals, provide food and medical care, and build a kinder Nepal.',
    cta_report: 'Report an Animal', cta_donate: 'Donate Now',
    stat_rescued: 'Animals Rescued', stat_volunteers: 'Volunteers', stat_donations: 'Donations (NPR)', stat_reports: 'Active Reports',
    stories_title: 'Featured Rescue Stories', report_title: 'Report an Injured Animal (Helpline)', report_emergency: 'Emergency Helpline: +977-9800000000'
  },
  np: {
    nav_home: 'गृहपृष्ठ', nav_report: 'जनावर रिपोर्ट', nav_donate: 'दान', nav_volunteer: 'स्वयंसेवक', nav_stories: 'उद्धार कथाहरू', nav_contact: 'सम्पर्क',
    hero_title: 'जीवन बचाऔं – नेपालका जनावर उद्धार गरौं',
    hero_text: 'हामी मिलेर घाइते सडक जनावरलाई उद्धार, खाना र उपचार उपलब्ध गराउँछौं।',
    cta_report: 'जनावर रिपोर्ट गर्नुहोस्', cta_donate: 'अहिले दान गर्नुहोस्',
    stat_rescued: 'उद्धार गरिएका जनावर', stat_volunteers: 'स्वयंसेवक', stat_donations: 'दान (रु)', stat_reports: 'सक्रिय रिपोर्ट',
    stories_title: 'प्रमुख उद्धार कथाहरू', report_title: 'घाइते जनावर रिपोर्ट (हेल्पलाइन)', report_emergency: 'आपतकालीन हेल्पलाइन: +977-9800000000'
  }
};

let currentLang = 'en';
const langToggle = document.getElementById('langToggle');
const adminSection = document.getElementById('admin');
const loginStatus = document.getElementById('loginStatus');

langToggle?.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'np' : 'en';
  langToggle.textContent = currentLang === 'en' ? 'नेपाली' : 'English';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18n[currentLang][el.dataset.i18n] || el.textContent;
  });
});

async function loadStats() {
  const res = await fetch('/api/stats');
  const data = await res.json();
  document.getElementById('rescuedCount').textContent = data.rescued;
  document.getElementById('volunteerCount').textContent = data.volunteers;
  document.getElementById('donationCount').textContent = data.donationsNpr.toLocaleString();
  document.getElementById('reportCount').textContent = data.activeReports;
}

async function checkAuthStatus() {
  const res = await fetch('/api/auth/status');
  const data = await res.json();
  if (!data.authenticated) {
    adminSection.style.display = 'none';
    loginStatus.textContent = 'Please login as visitor/admin.';
    return;
  }

  if (data.user.role === 'admin') {
    adminSection.style.display = 'block';
    loginStatus.textContent = `Admin logged in: ${data.user.email}`;
  } else {
    adminSection.style.display = 'none';
    loginStatus.textContent = `Logged in as ${data.user.provider || 'visitor'} user.`;
  }
}

document.getElementById('visitorLogin')?.addEventListener('click', async () => {
  await fetch('/api/login/visitor', { method: 'POST' });
  await checkAuthStatus();
});

document.getElementById('socialLogin')?.addEventListener('click', () => {
  window.location.href = '/auth/google';
});

document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  await fetch('/api/logout', { method: 'POST' });
  await checkAuthStatus();
});

document.getElementById('reportForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('/api/report', { method: 'POST', body: formData });
  const out = await res.json();
  document.getElementById('reportStatus').textContent = out.message || out.error;
  if (res.ok) { e.target.reset(); loadStats(); }
});

const chatMessages = document.getElementById('chatMessages');
const chatBox = document.getElementById('chat');
const chatToggle = document.getElementById('chatToggle');

function renderChat(messages) {
  chatMessages.innerHTML = messages.map(m => `<div class="msg ${m.from}"><strong>${m.from}:</strong> ${m.text}</div>`).join('');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('chatForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value;
  const res = await fetch('/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
  });
  const out = await res.json();
  renderChat(out.messages || []);
  e.target.reset();
});

chatToggle?.addEventListener('click', () => {
  const minimized = chatBox.classList.toggle('minimized');
  chatToggle.textContent = minimized ? '💬 Open Help' : '🫶 Help';
});

loadStats();
checkAuthStatus();
renderChat([{ from: 'bot', text: 'Welcome to SaveAnimal Nepal quick help.' }]);
