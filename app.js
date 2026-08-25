/* ==========================================================================
   SGT University, GITAM & NIAT India Master Interactive App Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SGT 3D PERSPECTIVE CAROUSEL LOGIC
  // ==========================================

  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.getElementById('prev-3d-btn');
  const nextBtn = document.getElementById('next-3d-btn');
  let currentIndex = 2; // Center card

  const positions = ['pos-left-2', 'pos-left-1', 'pos-center', 'pos-right-1', 'pos-right-2'];

  function updateCarousel3D() {
    cards.forEach((card, i) => {
      card.className = 'carousel-card';
      const posIndex = (i - currentIndex + 2 + cards.length) % cards.length;
      if (posIndex < positions.length) {
        card.classList.add(positions[posIndex]);
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel3D();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel3D();
    });
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel3D();
  }, 4000);

  // ==========================================
  // 2. NIAT INDIA BENEFITS TABS LOGIC
  // ==========================================

  const niatTabs = document.querySelectorAll('.niat-nav-tab');
  niatTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      niatTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showToast(`Showing ${tab.innerText} for SGTians`, 'info');
    });
  });

  // ==========================================
  // 3. AI CHATBOT WIDGET & POPUP INTERACTIVITY
  // ==========================================

  const chatbotToggle = document.getElementById('chatbot-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeChatBtn = document.getElementById('close-chat-btn');
  const chatInput = document.getElementById('chat-input');
  const sendChatBtn = document.getElementById('send-chat-btn');
  const chatBody = document.getElementById('chat-body');

  function toggleChat() {
    if (!chatWindow) return;
    chatWindow.classList.toggle('active');
  }

  if (chatbotToggle) chatbotToggle.addEventListener('click', toggleChat);
  if (closeChatBtn) closeChatBtn.addEventListener('click', toggleChat);

  function handleSendChat() {
    if (!chatInput || !chatBody) return;
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg chat-msg-user';
    userMsg.innerText = text;
    chatBody.appendChild(userMsg);

    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg chat-msg-bot';

      const lower = text.toLowerCase();
      if (lower.includes('mbbs') || lower.includes('medical') || lower.includes('bams')) {
        botMsg.innerText = 'SGT Faculty of Medicine (FMHS) offers MBBS & BAMS with clinical training at our 800-bed hospital. Admissions are based on NEET UG 2026 score.';
      } else if (lower.includes('btech') || lower.includes('engineering') || lower.includes('fee')) {
        botMsg.innerText = 'B.Tech AI/ML & CSE fee is approx ₹1.90 LPA. Scholarships up to 100% are available based on JEE Main / Class 12th Board marks.';
      } else if (lower.includes('apply') || lower.includes('register')) {
        botMsg.innerText = 'You can click the yellow "APPLY NOW" button at the top of the page to submit your application online.';
      } else {
        botMsg.innerText = 'Thank you for reaching out to SGT University! An admissions representative will assist you shortly. Helpline: 1800 102 5661.';
      }

      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
  }

  if (sendChatBtn) sendChatBtn.addEventListener('click', handleSendChat);
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSendChat();
    });
  }

  // ==========================================
  // 4. SCROLL TO TOP & STICKY TABS
  // ==========================================

  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.getElementById('sticky-reg-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('sticky-apply-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('header-apply-now-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('sgt-online-btn')?.addEventListener('click', () => openApplyModal());

  document.getElementById('accessibility-btn')?.addEventListener('click', () => {
    showToast('Accessibility High Contrast Mode Toggled', 'info');
    document.body.classList.toggle('high-contrast');
  });

  // ==========================================
  // 5. MODALS & TOAST NOTIFICATIONS
  // ==========================================

  const applyModal = document.getElementById('apply-modal');
  const closeApplyModalBtn = document.getElementById('close-apply-modal');

  function openApplyModal() {
    if (applyModal) applyModal.classList.add('active');
  }

  function closeModals() {
    if (applyModal) applyModal.classList.remove('active');
  }

  if (closeApplyModalBtn) closeApplyModalBtn.addEventListener('click', closeModals);

  if (applyModal) {
    applyModal.addEventListener('click', (e) => {
      if (e.target === applyModal) closeModals();
    });
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    let iconClass = 'fa-circle-check';
    if (type === 'info') iconClass = 'fa-circle-info';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  const modalApplyForm = document.getElementById('modal-apply-form');
  if (modalApplyForm) {
    modalApplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModals();
      showToast('SGT Application Submitted Successfully! Ref ID: SGT-2026-' + Math.floor(1000 + Math.random() * 9000));
      modalApplyForm.reset();
    });
  }
});
