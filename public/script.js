// ============ INITIALIZATION ============
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  // Load user from localStorage
  const savedUser = localStorage.getItem('saveanimal_user');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      updateUIForUser();
    } catch (e) {
      console.error('Failed to load user:', e);
      localStorage.removeItem('saveanimal_user');
    }
  }

  // Load saved language preference
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  document.documentElement.lang = savedLang;
  updateLanguageToggleButton(savedLang);

  // Setup all event listeners
  setupEventListeners();

  // Load and display data
  updatePageStats();
  setupFormSubmissions();
});

// ============ EVENT LISTENER SETUP ============
function setupEventListeners() {
  // Login modal
  document.getElementById('loginNavBtn')?.addEventListener('click', () => openModal('loginModal'));
  document.getElementById('closeLoginModal')?.addEventListener('click', () => closeModal('loginModal'));
  
  // Social login buttons
  document.getElementById('googleLoginBtn')?.addEventListener('click', () => simulateLogin('volunteer'));
  document.getElementById('facebookLoginBtn')?.addEventListener('click', () => simulateLogin('admin'));
  document.getElementById('visitorLoginBtn')?.addEventListener('click', () => simulateLogin('visitor'));

  // Profile modal
  document.getElementById('closeProfileModal')?.addEventListener('click', () => closeModal('profileModal'));
  document.getElementById('profileLogoutBtn')?.addEventListener('click', handleLogout);
  document.getElementById('profileNavBtn')?.addEventListener('click', () => openModal('profileModal'));

  // Language toggle
  document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);

  // Chat widget
  document.getElementById('chatToggle')?.addEventListener('click', toggleChat);
  document.getElementById('chatForm')?.addEventListener('submit', handleChatSubmit);

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}

// ============ LOGIN SYSTEM ============
function simulateLogin(role) {
  // Mock login (in production, use Firebase)
  const mockUsers = {
    volunteer: {
      id: 'VOL-' + Date.now(),
      role: 'volunteer',
      name: 'Priya Shrestha',
      email: 'priya@saveanimal.com',
      avatar: '👩\u200d🔬',
      hours: 45,
      activities: 12,
      skills: ['Rescue', 'Feeding', 'Social Media']
    },
    admin: {
      id: 'ADM-' + Date.now(),
      role: 'admin',
      name: 'Admin Team',
      email: 'admin@saveanimal.com',
      avatar: '👨\u200d💼',
      department: 'Management'
    },
    visitor: {
      id: 'VIS-' + Date.now(),
      role: 'visitor',
      name: 'Guest User',
      email: 'visitor@example.com',
      avatar: '👤'
    }
  };

  const userData = mockUsers[role] || mockUsers.visitor;
  userData.loginTime = new Date().toISOString();

  localStorage.setItem('saveanimal_user', JSON.stringify(userData));
  currentUser = userData;

  // Role-based redirect
  if (role === 'volunteer' || role === 'admin') {
    closeModal('loginModal');
    showStatus('loginModalStatus', `Welcome ${userData.name}! Redirecting to dashboard...`, 'success');
    setTimeout(() => {
      window.location.href = '/dashboard/index.html';
    }, 1500);
  } else {
    // Visitor: show profile modal
    updateUIForUser();
    closeModal('loginModal');
    openModal('profileModal');
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('saveanimal_user');
    currentUser = null;
    updateUIForUser();
    closeModal('profileModal');
    showStatus('profileModal', 'You have been logged out', 'success', 2000);
  }
}

// ============ UI UPDATES ============
function updateUIForUser() {
  const loginBtn = document.getElementById('loginNavBtn');
  const profileBtn = document.getElementById('profileNavBtn');
  const adminSection = document.getElementById('admin');

  if (!currentUser) {
    loginBtn?.style.removeProperty('display');
    profileBtn?.style.setProperty('display', 'none', 'important');
    if (adminSection) adminSection.style.display = 'none';
    updateProfileModal();
    return;
  }

  // Update navbar
  loginBtn?.style.setProperty('display', 'none', 'important');
  profileBtn?.style.removeProperty('display');
  
  const navAvatar = document.getElementById('navAvatar');
  const navName = document.getElementById('navName');
  if (navAvatar) navAvatar.textContent = currentUser.avatar || '👤';
  if (navName) navName.textContent = currentUser.name?.split(' ')[0] || 'User';

  // Show admin section if admin
  if (currentUser.role === 'admin' && adminSection) {
    adminSection.style.display = 'block';
    updateAdminPanel();
  }

  // Update profile modal
  updateProfileModal();
}

function updateProfileModal() {
  const displayName = document.getElementById('profileDisplayName');
  const email = document.getElementById('profileEmail');
  const roleBadge = document.getElementById('profileRoleBadge');
  const providerBadge = document.getElementById('profileProviderBadge');
  const profilePhoto = document.getElementById('profilePhoto');

  if (!currentUser) {
    displayName.textContent = 'Not Logged In';
    email.textContent = 'Login to view profile';
    roleBadge.textContent = 'Guest';
    roleBadge.className = 'badge badge-info';
    providerBadge.textContent = '';
    return;
  }

  displayName.textContent = currentUser.name || 'User';
  email.textContent = currentUser.email || 'No email';
  profilePhoto.textContent = currentUser.avatar || '👤';

  // Role badge
  const roleMap = { admin: 'error', volunteer: 'success', visitor: 'info' };
  const roleText = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
  roleBadge.textContent = roleText;
  roleBadge.className = `badge badge-${roleMap[currentUser.role] || 'info'}`;

  // Stats
  const reportCount = document.getElementById('myReportCount');
  const donationCount = document.getElementById('myDonationCount');
  const volunteerStatus = document.getElementById('myVolunteerStatus');

  if (currentUser.role === 'volunteer') {
    reportCount.textContent = currentUser.activities || '0';
    volunteerStatus.textContent = '✓ Active';
    donationCount.textContent = '—';
  } else if (currentUser.role === 'admin') {
    reportCount.textContent = localStorage.getItem('rescueReports')?.split(',').length || '0';
    donationCount.textContent = localStorage.getItem('donations')?.split(',').length || '0';
    volunteerStatus.textContent = 'Admin';
  } else {
    reportCount.textContent = '—';
    donationCount.textContent = '—';
    volunteerStatus.textContent = '—';
  }

  // Activity list
  const activityList = document.getElementById('myActivityList');
  if (currentUser.role === 'volunteer') {
    activityList.innerHTML = `
      <div class="activity-item">
        <span>🐾</span>
        <div>
          <strong>${currentUser.activities || 0} rescue activities</strong>
          <small>${currentUser.hours || 0} hours volunteered</small>
        </div>
      </div>
      <div class="activity-item">
        <span>📚</span>
        <div>
          <strong>Skills</strong>
          <small>${(currentUser.skills || []).join(', ')}</small>
        </div>
      </div>
    `;
  } else if (currentUser.role === 'admin') {
    activityList.innerHTML = `
      <div class="activity-item">
        <span>🛡️</span>
        <div>
          <strong>Admin Access</strong>
          <small>View dashboard for full stats</small>
        </div>
      </div>
    `;
  } else {
    activityList.innerHTML = `
      <div class="activity-item">
        <span>📝</span>
        <div>
          <strong>Visitor Mode</strong>
          <small>Report animals and view our work</small>
        </div>
      </div>
    `;
  }
}

// ============ PAGE STATS ============
function updatePageStats() {
  try {
    const reports = JSON.parse(localStorage.getItem('rescueReports') || '[]');
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');

    document.getElementById('rescuedCount').textContent = Math.floor(reports.length * 2.5) || 0;
    document.getElementById('volunteerCount').textContent = volunteers.length || 0;
    document.getElementById('donationCount').textContent = donations.reduce((sum, d) => sum + (parseInt(d.amount) || 0), 0) || 0;
    document.getElementById('reportCount').textContent = reports.length || 0;
  } catch (e) {
    console.error('Error updating stats:', e);
  }
}

// ============ FORM SUBMISSIONS ============
function setupFormSubmissions() {
  // Report form
  document.getElementById('reportForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const report = {
      id: 'RESCUE-' + Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      condition: formData.get('condition'),
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    
    let reports = JSON.parse(localStorage.getItem('rescueReports') || '[]');
    reports.push(report);
    localStorage.setItem('rescueReports', JSON.stringify(reports));
    
    showStatus('reportStatus', '✓ Report submitted! Our team will respond soon.', 'success');
    e.target.reset();
    updatePageStats();
  });

  // Donation form
  document.getElementById('donationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const donation = {
      id: 'DONATION-' + Date.now(),
      donor: formData.get('donorName'),
      amount: formData.get('amount'),
      frequency: formData.get('frequency'),
      method: formData.get('method'),
      timestamp: new Date().toISOString()
    };
    
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));
    
    showStatus('donationStatus', `✓ Thank you! Donation of NPR ${donation.amount} recorded.`, 'success');
    e.target.reset();
    updatePageStats();
  });

  // Volunteer form
  document.getElementById('volunteerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const volunteer = {
      id: 'VOL-' + Date.now(),
      name: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      availability: formData.get('availability'),
      reason: formData.get('reason'),
      joinDate: new Date().toISOString(),
      status: 'Pending'
    };
    
    let volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    volunteers.push(volunteer);
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
    
    showStatus('volunteerStatus', '✓ Welcome! We\'ll contact you soon.', 'success');
    e.target.reset();
    updatePageStats();
  });
}

// ============ CHATBOT ============
function handleChatSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[name="text"]');
  const message = input.value.trim();
  
  if (!message) return;

  // Add user message
  const messagesDiv = document.getElementById('chatMessages');
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user-msg';
  userMsg.textContent = message;
  messagesDiv.appendChild(userMsg);

  // Simulate bot response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot-msg';
    
    const responses = [
      '🐾 How can I help you today?',
      'That\'s a great question! 💙 Have you checked our report form?',
      'We\'re here to help! 🐾 Would you like to volunteer or donate?',
      'Thank you for your interest! 🙏 Feel free to contact us via email.',
      'You can report injured animals through our quick form. 📝'
    ];
    botMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
    messagesDiv.appendChild(botMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 500);

  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function toggleChat() {
  const chatWidget = document.getElementById('chat');
  chatWidget.classList.toggle('minimized');
  const toggle = document.getElementById('chatToggle');
  toggle.textContent = chatWidget.classList.contains('minimized') ? '💬 Open Chat' : '💬 Close Chat';
}

// ============ LANGUAGE TOGGLE ============
function toggleLanguage() {
  const currentLang = document.documentElement.lang || 'en';
  const newLang = currentLang === 'en' ? 'ne' : 'en';
  
  document.documentElement.lang = newLang;
  localStorage.setItem('preferredLanguage', newLang);
  updateLanguageToggleButton(newLang);

  // Simple translation (in production, use i18n library)
  const translations = {
    en: {
      'nav_home': 'Home',
      'nav_stories': 'Stories',
      'nav_report': 'Report',
      'nav_donate': 'Donate',
      'nav_volunteer': 'Volunteer',
      'nav_about': 'About',
      'nav_contact': 'Contact'
    },
    ne: {
      'nav_home': 'गृह',
      'nav_stories': 'कहानीहरू',
      'nav_report': 'रिपोर्ट',
      'nav_donate': 'दान दिनुहोस्',
      'nav_volunteer': 'स्वेच्छासेवक',
      'nav_about': 'बारेमा',
      'nav_contact': 'सम्पर्क'
    }
  };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[newLang]?.[key]) {
      el.textContent = translations[newLang][key];
    }
  });
}

function updateLanguageToggleButton(lang) {
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'en' ? 'नेपाली' : 'English';
}

// ============ ADMIN PANEL ============
function updateAdminPanel() {
  try {
    const reports = JSON.parse(localStorage.getItem('rescueReports') || '[]');
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');

    document.getElementById('as-rescued').textContent = reports.length * 3 || 0;
    document.getElementById('as-volunteers').textContent = volunteers.length || 0;
    document.getElementById('as-donations').textContent = donations.reduce((sum, d) => sum + (parseInt(d.amount) || 0), 0) || 0;
    document.getElementById('as-reports').textContent = reports.filter(r => r.status === 'Pending').length || 0;

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab)?.classList.add('active');
      });
    });
  } catch (e) {
    console.error('Admin panel error:', e);
  }
}

// ============ UTILITY FUNCTIONS ============
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

function showStatus(elementId, message, type = 'info', duration = 3000) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  el.textContent = message;
  el.className = `status ${type}`;
  el.style.display = 'block';
  
  if (duration > 0) {
    setTimeout(() => {
      el.style.display = 'none';
    }, duration);
  }
}