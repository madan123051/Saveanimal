// ════════════════════════════════════════════════════════════════════════════
// MOBILE MENU TOGGLE
// ════════════════════════════════════════════════════════════════════════════
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks?.classList.toggle('active');
});

// ════════════════════════════════════════════════════════════════════════════
// AUTO-CLOSE SIDEBAR MENU ON OUTSIDE CLICK OR ON LINK CLICK
// ════════════════════════════════════════════════════════════════════════════
document.addEventListener('click', (e) => {
  // If nav-links is active and click is outside nav area, close it
  if (navLinks?.classList.contains('active')) {
    if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
      navLinks.classList.remove('active');
    }
  }
});

// Close menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CHAT WIDGET - HIDDEN BY DEFAULT, OPEN ONLY ON CLICK
// ════════════════════════════════════════════════════════════════════════════
const chatWidget = document.querySelector('.chat-widget');
const chatToggle = document.querySelector('.chat-toggle');
const chatClose = document.querySelector('.chat-close');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');

// Show chat ONLY when button is clicked
chatToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  chatWidget?.classList.add('active');
  chatInput?.focus();
});

// Close chat when X button is clicked
chatClose?.addEventListener('click', (e) => {
  e.stopPropagation();
  chatWidget?.classList.remove('active');
});

// Close chat when clicking outside of it
document.addEventListener('click', (e) => {
  if (chatWidget?.classList.contains('active')) {
    if (!e.target.closest('.chat-widget') && !e.target.closest('.chat-toggle')) {
      chatWidget.classList.remove('active');
    }
  }
});

// Send message functionality
chatSend?.addEventListener('click', () => {
  const message = chatInput?.value.trim();
  if (message) {
    // Add message to chat
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user-message';
    msgDiv.textContent = message;
    chatMessages?.appendChild(msgDiv);
    
    // Clear input
    if (chatInput) chatInput.value = '';
    chatInput?.focus();
    
    // Scroll to bottom
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // TODO: Send to your backend/API
    // fetch('/api/chat', { method: 'POST', body: JSON.stringify({message}) })
    //   .then(res => res.json())
    //   .then(data => {
    //     const replyDiv = document.createElement('div');
    //     replyDiv.className = 'message bot-message';
    //     replyDiv.textContent = data.reply;
    //     chatMessages?.appendChild(replyDiv);
    //     chatMessages.scrollTop = chatMessages.scrollHeight;
    //   });
  }
});

// Allow Enter key to send message
chatInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatSend?.click();
  }
});

// ════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ════════════════════════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks?.classList.remove('active');
      }
    }
  });
});

// ════════════════════════════════════════════════════════════════════════════
// FORM HANDLERS (Ready for Firebase integration)
// ════════════════════════════════════════════════════════════════════════════
const reportForm = document.querySelector('#report-form');
const donateForm = document.querySelector('#donate-form');
const volunteerForm = document.querySelector('#volunteer-form');

reportForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Send to Firebase Realtime Database or Firestore
  console.log('Report submitted');
  alert('Thank you for reporting! Our team will review it soon.');
  reportForm.reset();
});

donateForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Integrate Stripe/Razorpay for payments
  console.log('Donation submitted');
  alert('Thank you for your donation!');
  donateForm.reset();
});

volunteerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Send to Firebase and send confirmation email
  console.log('Volunteer application submitted');
  alert('Thank you for volunteering! We will contact you soon.');
  volunteerForm.reset();
});