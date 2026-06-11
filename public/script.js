// ============ USER & ROLE MANAGEMENT ============
let currentUser = JSON.parse(localStorage.getItem('saveanimal_user')) || null;

// Check on page load
function initializeUser() {
  const user = JSON.parse(localStorage.getItem('saveanimal_user'));
  if (user) {
    currentUser = user;
    updateUIForUser();
  }
}

// Update UI based on user role
function updateUIForUser() {
  if (!currentUser) {
    showElement('authSection');
    hideElement('userProfile');
    return;
  }

  hideElement('authSection');
  showElement('userProfile');
  
  const { role, name, email } = currentUser;
  
  // Update profile display
  document.getElementById('profileName').textContent = name || 'User';
  document.getElementById('profileEmail').textContent = email || 'N/A';
  document.getElementById('userRole').textContent = role.charAt(0).toUpperCase() + role.slice(1);
  
  // Role badge color
  const roleBadge = document.getElementById('userRole');
  roleBadge.className = 'badge badge-lg ' + (
    role === 'admin' ? 'badge-error' : 
    role === 'volunteer' ? 'badge-success' : 
    'badge-info'
  );
}

// LOGIN HANDLER
function handleLogin(role) {
  const userData = {
    id: Math.random().toString(36).substr(2, 9),
    role: role,
    name: document.getElementById('userName')?.value || `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
    email: document.getElementById('userEmail')?.value || `${role}@saveanimal.com`,
    loginTime: new Date().toISOString(),
    hours: role === 'volunteer' ? Math.floor(Math.random() * 100) + 10 : undefined,
    activities: role === 'volunteer' ? Math.floor(Math.random() * 20) + 1 : undefined
  };

  // Save to localStorage
  localStorage.setItem('saveanimal_user', JSON.stringify(userData));
  currentUser = userData;

  // Role-based redirect
  if (role === 'volunteer' || role === 'admin') {
    // REDIRECT TO DASHBOARD (with auto-login)
    setTimeout(() => {
      window.location.href = '/dashboard/index.html';
    }, 500);
  } else if (role === 'visitor') {
    // SHOW PROFILE MODAL FOR VISITOR
    updateUIForUser();
    closeModal('loginModal');
    openModal('profileModal');
  }
}

// LOGOUT HANDLER
function handleLogout() {
  localStorage.removeItem('saveanimal_user');
  currentUser = null;
  updateUIForUser();
  closeModal('profileModal');
}

// ============ MODAL HELPERS ============
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.showModal();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.close();
}

// ============ ELEMENT VISIBILITY ============
function showElement(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = 'block';
}

function hideElement(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = 'none';
}

// ============ INITIALIZE ON PAGE LOAD ============
document.addEventListener('DOMContentLoaded', initializeUser);

// ============ ANIMAL RESCUE REPORT ============
function submitRescueReport() {
  const name = document.getElementById('rescuerName').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('animalDescription').value;
  const imageInput = document.getElementById('animalImage');

  if (!name || !location || !description) {
    alert('Please fill all required fields');
    return;
  }

  const report = {
    id: 'RESCUE-' + Date.now(),
    reporter: name,
    location: location,
    description: description,
    timestamp: new Date().toISOString(),
    image: imageInput.files[0]?.name || 'no-image.jpg',
    status: 'Pending'
  };

  // Save to localStorage
  let reports = JSON.parse(localStorage.getItem('rescueReports')) || [];
  reports.push(report);
  localStorage.setItem('rescueReports', JSON.stringify(reports));

  alert('Animal rescue report submitted successfully! Ref: ' + report.id);
  
  // Reset form
  document.getElementById('rescueForm').reset();
  closeModal('rescueModal');
}

// ============ DONATION HANDLER ============
function processDonation(type) {
  const amount = document.getElementById('donationAmount').value;

  if (!amount || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  const donation = {
    id: 'DONATION-' + Date.now(),
    type: type, // one-time or monthly
    amount: amount,
    donor: currentUser?.name || 'Anonymous',
    timestamp: new Date().toISOString(),
    status: 'Completed'
  };

  let donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));

  alert(`Thank you for your ${type} donation of NPR ${amount}!`);
  
  document.getElementById('donationForm').reset();
  closeModal('donationModal');
}

// ============ VOLUNTEER SIGNUP ============
function submitVolunteerSignup() {
  const name = document.getElementById('volunteerName').value;
  const email = document.getElementById('volunteerEmail').value;
  const phone = document.getElementById('volunteerPhone').value;
  const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
    .map(el => el.value);

  if (!name || !email || !phone || skills.length === 0) {
    alert('Please fill all required fields');
    return;
  }

  const volunteer = {
    id: 'VOL-' + Date.now(),
    name: name,
    email: email,
    phone: phone,
    skills: skills,
    joinDate: new Date().toISOString(),
    status: 'Active',
    hours: 0,
    activities: 0
  };

  let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
  volunteers.push(volunteer);
  localStorage.setItem('volunteers', JSON.stringify(volunteers));

  alert('Signup successful! Welcome to SaveAnimal Nepal 🐾');
  
  document.getElementById('volunteerForm').reset();
  closeModal('volunteerModal');
}

// ============ LANGUAGE TOGGLE ============
function toggleLanguage() {
  const lang = document.documentElement.lang === 'en' ? 'ne' : 'en';
  document.documentElement.lang = lang;
  localStorage.setItem('preferredLanguage', lang);
  
  // Update UI text (simple version)
  const toggleBtn = document.getElementById('langToggle');
  toggleBtn.textContent = lang === 'en' ? 'नेपाली' : 'English';
  
  // In production, use i18n library for full translation
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  document.documentElement.lang = savedLang;
  document.getElementById('langToggle').textContent = savedLang === 'en' ? 'नेपाली' : 'English';
});