const i18n = {
  en: {
    nav_home: 'Home', nav_report: 'Report Animal', nav_donate: 'Donate', nav_volunteer: 'Volunteer', nav_about: 'About', nav_stories: 'Stories', nav_contact: 'Contact', nav_admin: 'Admin',
    hero_title: 'Help Save Lives – Rescue Animals in Nepal',
    hero_text: 'Together, we rescue injured street animals, provide food and medical care, and build a kinder Nepal.',
    cta_report: 'Report an Animal', cta_donate: 'Donate Now', cta_volunteer: 'Join as Volunteer',
    stat_rescued: 'Animals Rescued', stat_volunteers: 'Volunteers', stat_donations: 'Donations (NPR)', stat_reports: 'Active Reports',
    stories_title: 'Featured Rescue Stories', report_title: 'Report an Injured Animal (Helpline)', report_emergency: 'Emergency Helpline: +977-9800000000'
  },
  np: {
    nav_home: 'गृहपृष्ठ', nav_report: 'जनावर रिपोर्ट', nav_donate: 'दान', nav_volunteer: 'स्वयंसेवक', nav_about: 'हाम्रो बारेमा', nav_stories: 'उद्धार कथाहरू', nav_contact: 'सम्पर्क', nav_admin: 'एडमिन',
    hero_title: 'जीवन बचाऔं – नेपालका जनावर उद्धार गरौं',
    hero_text: 'हामी मिलेर घाइते सडक जनावरलाई उद्धार, खाना र उपचार उपलब्ध गराउँछौं।',
    cta_report: 'जनावर रिपोर्ट गर्नुहोस्', cta_donate: 'अहिले दान गर्नुहोस्', cta_volunteer: 'स्वयंसेवक बन्नुहोस्',
    stat_rescued: 'उद्धार गरिएका जनावर', stat_volunteers: 'स्वयंसेवक', stat_donations: 'दान (रु)', stat_reports: 'सक्रिय रिपोर्ट',
    stories_title: 'प्रमुख उद्धार कथाहरू', report_title: 'घाइते जनावर रिपोर्ट (हेल्पलाइन)', report_emergency: 'आपतकालीन हेल्पलाइन: +977-9800000000'
  }
};

let currentLang = 'en';
const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
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

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('/api/report', { method: 'POST', body: formData });
  const out = await res.json();
  document.getElementById('reportStatus').textContent = out.message || out.error;
  if (res.ok) { e.target.reset(); loadStats(); }
});

document.getElementById('donationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/donate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formToObject(e.target))
  });
  const out = await res.json();
  document.getElementById('donationStatus').textContent = out.message || out.error;
  if (res.ok) e.target.reset();
});

document.getElementById('volunteerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/volunteer', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formToObject(e.target))
  });
  const out = await res.json();
  document.getElementById('volunteerStatus').textContent = out.message || out.error;
  if (res.ok) e.target.reset();
});

const chatMessages = document.getElementById('chatMessages');
function renderChat(messages) {
  chatMessages.innerHTML = messages.map(m => `<div class="msg ${m.from}"><strong>${m.from}:</strong> ${m.text}</div>`).join('');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value;
  const res = await fetch('/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
  });
  const out = await res.json();
  renderChat(out.messages || []);
  e.target.reset();
});

document.getElementById('refreshAdmin').addEventListener('click', async () => {
  const res = await fetch('/api/admin');
  const data = await res.json();
  document.getElementById('adminData').textContent = JSON.stringify(data, null, 2);
});

loadStats();
renderChat([{ from: 'bot', text: 'Welcome to SaveAnimal Nepal quick help.' }]);
