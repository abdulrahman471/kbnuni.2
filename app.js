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

  // Direct click on any card brings it to center!
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel3D();
      showToast(`Selected ${card.querySelector('h4')?.innerText || 'Discipline'}`, 'info');
    });
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel3D();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel3D();
    });
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel3D();
  }, 4500);

  // ==========================================
  // 2. HEADER COURSE SELECT SYNC
  // ==========================================

  const headerCourseSelect = document.getElementById('header-course-select');
  const modalCourseSelect = document.getElementById('modal-course-select');

  if (headerCourseSelect) {
    headerCourseSelect.addEventListener('change', (e) => {
      const selectedCourse = e.target.value;
      if (selectedCourse) {
        if (modalCourseSelect) modalCourseSelect.value = selectedCourse;
        openApplyModal();
        showToast(`Selected ${selectedCourse} - Starting Application Form`, 'info');
      }
    });
  }

  // ==========================================
  // 3. STATS CARDS INTERACTIVITY
  // ==========================================

  const statsCards = document.querySelectorAll('.stats-card');
  statsCards.forEach(card => {
    card.addEventListener('click', () => {
      const statInfo = card.getAttribute('data-stat') || 'SGT Excellence Feature';
      showToast(statInfo, 'info');
    });
  });

  // ==========================================
  // 4. TOP PLACEMENTS STUDENT CARDS CLICK
  // ==========================================

  const placementCards = document.querySelectorAll('.student-placement-card');
  placementCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      const pkg = card.getAttribute('data-package');
      const company = card.getAttribute('data-company');
      const role = card.getAttribute('data-role');
      showToast(`🎉 ${name} placed at ${company} as ${role} with package ${pkg}!`);
    });
  });

  // ==========================================
  // 5. FAQ ACCORDION & PILL TABS
  // ==========================================

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  const faqPillTabs = document.querySelectorAll('#faq-pill-tabs .tab-btn');
  faqPillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      faqPillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showToast(`Filtered FAQ category: ${tab.innerText}`, 'info');
    });
  });

  // ==========================================
  // 6. VIDEO MODAL PLAYER LOGIC
  // ==========================================

  const videoModal = document.getElementById('video-modal');
  const closeVideoModalBtn = document.getElementById('close-video-modal');
  const playVideoBtn = document.getElementById('play-video-btn');

  if (playVideoBtn && videoModal) {
    playVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      showToast('Playing 12-Hour Hackathon Official Aftermovie', 'info');
    });
  }

  if (closeVideoModalBtn && videoModal) {
    closeVideoModalBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
  }

  // ==========================================
  // 7. COUNSELLOR BANNER & MODALS
  // ==========================================

  document.getElementById('talk-counsellor-btn')?.addEventListener('click', () => {
    openApplyModal();
    showToast('Connecting with SGT Senior Counselor...', 'info');
  });

  const applyModal = document.getElementById('apply-modal');
  const closeApplyModalBtn = document.getElementById('close-apply-modal');

  function openApplyModal() {
    if (applyModal) applyModal.classList.add('active');
  }

  function closeModals() {
    if (applyModal) applyModal.classList.remove('active');
    if (videoModal) videoModal.classList.remove('active');
  }

  if (closeApplyModalBtn) closeApplyModalBtn.addEventListener('click', closeModals);

  if (applyModal) {
    applyModal.addEventListener('click', (e) => {
      if (e.target === applyModal) closeModals();
    });
  }

  // ==========================================
  // 8. AI CHATBOT WIDGET LOGIC
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
  // 9. SCROLL TO TOP & STICKY TABS
  // ==========================================

  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.getElementById('sticky-reg-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('sticky-apply-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('sticky-contact-btn')?.addEventListener('click', () => {
    openApplyModal();
    showToast('Opening SGT Contact & Admission Helpdesk', 'info');
  });
  document.getElementById('header-apply-now-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('sgt-online-btn')?.addEventListener('click', () => openApplyModal());

  document.getElementById('accessibility-btn')?.addEventListener('click', () => {
    showToast('Accessibility High Contrast Mode Toggled', 'info');
    document.body.classList.toggle('high-contrast');
  });

  // ==========================================
  // 10. TOAST NOTIFICATIONS HELPER
  // ==========================================

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
