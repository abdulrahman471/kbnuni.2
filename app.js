/* ==========================================================================
   SGT / KBN University - Application Logic (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // PROGRAM DATA & DYNAMIC FILTERING
  // ==========================================

  const programs = [
    {
      id: 1,
      title: 'MBBS (Bachelor of Medicine)',
      category: 'ug',
      school: 'Faculty of Medicine',
      duration: '5.5 Years (Inc. Internship)',
      eligibility: '10+2 with PCB (50%+) & NEET Qualified',
      fee: '₹18,000,000 / Total'
    },
    {
      id: 2,
      title: 'B.Tech Computer Science (AI & ML)',
      category: 'ug',
      school: 'Faculty of Engineering',
      duration: '4 Years',
      eligibility: '10+2 with PCM (50%+) or JEE Main',
      fee: '₹1,90,000 / Year'
    },
    {
      id: 3,
      title: 'BDS (Bachelor of Dental Surgery)',
      category: 'ug',
      school: 'Faculty of Dental Sciences',
      duration: '5 Years',
      eligibility: '10+2 PCB & NEET Qualified',
      fee: '₹3,50,000 / Year'
    },
    {
      id: 4,
      title: 'B.Pharm (Bachelor of Pharmacy)',
      category: 'ug',
      school: 'Faculty of Pharmacy',
      duration: '4 Years',
      eligibility: '10+2 with Physics, Chemistry, Bio/Math',
      fee: '₹1,25,000 / Year'
    },
    {
      id: 5,
      title: 'BA LLB (Hons) Integrated',
      category: 'ug',
      school: 'Faculty of Law',
      duration: '5 Years',
      eligibility: '10+2 in any stream (45%+)',
      fee: '₹1,40,000 / Year'
    },
    {
      id: 6,
      title: 'MBA in Business Analytics & HR',
      category: 'pg',
      school: 'Faculty of Management',
      duration: '2 Years',
      eligibility: 'Graduation in any stream (50%+)',
      fee: '₹2,10,000 / Year'
    },
    {
      id: 7,
      title: 'M.Sc Medical Biotechnology',
      category: 'pg',
      school: 'Faculty of Allied Health',
      duration: '2 Years',
      eligibility: 'B.Sc in Life Sciences / Bio',
      fee: '₹95,000 / Year'
    },
    {
      id: 8,
      title: 'B.Sc Nursing',
      category: 'ug',
      school: 'Faculty of Nursing',
      duration: '4 Years',
      eligibility: '10+2 PCB (45%+)',
      fee: '₹1,10,000 / Year'
    },
    {
      id: 9,
      title: 'Ph.D in Medical / Dental Sciences',
      category: 'phd',
      school: 'Research & Doctoral Cell',
      duration: '3 - 5 Years',
      eligibility: 'Master\'s Degree (55%+)',
      fee: '₹80,000 / Year'
    },
    {
      id: 10,
      title: 'Diploma in Pharmacy (D.Pharm)',
      category: 'diploma',
      school: 'Faculty of Pharmacy',
      duration: '2 Years',
      eligibility: '10+2 PCB / PCM',
      fee: '₹75,000 / Year'
    },
    {
      id: 11,
      title: 'B.Sc (Hons) Agriculture',
      category: 'ug',
      school: 'Faculty of Agricultural Sciences',
      duration: '4 Years',
      eligibility: '10+2 Agriculture / PCB / PCM',
      fee: '₹1,15,000 / Year'
    },
    {
      id: 12,
      title: 'M.Tech Artificial Intelligence',
      category: 'pg',
      school: 'Faculty of Engineering',
      duration: '2 Years',
      eligibility: 'B.E. / B.Tech in relevant branch',
      fee: '₹1,20,000 / Year'
    }
  ];

  const programContainer = document.getElementById('program-cards-container');
  const filterTabs = document.querySelectorAll('#program-filter-tabs .tab-btn');
  const searchInput = document.getElementById('program-search-input');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function renderPrograms() {
    if (!programContainer) return;

    const filtered = programs.filter(prog => {
      const matchCategory = currentCategory === 'all' || prog.category === currentCategory;
      const matchSearch = prog.title.toLowerCase().includes(currentSearchQuery) ||
                          prog.school.toLowerCase().includes(currentSearchQuery);
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      programContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #FFF; border-radius: 12px; border: 1px dashed #CBD5E1;">
          <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: #94A3B8; margin-bottom: 1rem;"></i>
          <h3 style="color: #0F172A;">No Programs Found</h3>
          <p style="color: #64748B;">Try adjusting your filter or search keywords.</p>
        </div>
      `;
      return;
    }

    programContainer.innerHTML = filtered.map(prog => `
      <div class="program-card">
        <div class="program-card-header">
          <span class="program-school-tag">${prog.school}</span>
          <span class="badge badge-gold" style="font-size: 0.7rem;">2026 Open</span>
        </div>
        <h3 class="program-title">${prog.title}</h3>
        <div class="program-meta">
          <div class="meta-item">
            <span class="meta-label">Duration</span>
            <span class="meta-value"><i class="fa-regular fa-clock"></i> ${prog.duration}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Eligibility</span>
            <span class="meta-value">${prog.eligibility}</span>
          </div>
        </div>
        <div class="program-card-footer">
          <div class="fee-text">Fee: <span class="fee-amount">${prog.fee}</span></div>
          <button class="btn btn-royal program-apply-btn" data-title="${prog.title}" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
            Apply <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Attach event listeners to newly rendered program apply buttons
    document.querySelectorAll('.program-apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-title');
        openApplyModal(title);
      });
    });
  }

  // Filter tab listener
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter');
      renderPrograms();
    });
  });

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderPrograms();
    });
  }

  // Initial render
  renderPrograms();

  // ==========================================
  // CAMPUS LIFE INTERACTIVE TABS
  // ==========================================

  const campusTabs = document.querySelectorAll('#campus-tabs .campus-tab-btn');
  const campusGraphic = document.getElementById('campus-graphic');
  const campusTextContent = document.getElementById('campus-text-content');

  const campusData = {
    hospital: {
      title: '800-Bed Multi-Specialty Super Specialty Hospital',
      desc: 'Providing round-the-clock emergency medical services, advanced ICU units, modular operation theaters, and real-time clinical training for medical and nursing students.',
      icon: 'fa-hospital-user',
      features: ['24/7 Emergency & Trauma', 'Advanced MRI & CT Scan', 'Modular Operation Theaters', 'Robotic Surgery Simulation']
    },
    labs: {
      title: 'AI, Robotics & High-Tech Research Labs',
      desc: 'Equipped with supercomputers, IoT testing rigs, 3D printing equipment, and advanced biotech diagnostic tools for hands-on research.',
      icon: 'fa-microchip',
      features: ['NVIDIA AI Workstations', '3D Prototyping Lab', 'Gene Sequencing Rig', 'Robotic Automation Arms']
    },
    library: {
      title: 'Central Digital Library & Learning Hub',
      desc: 'Over 100,000+ print volumes, access to IEEE, PubMed, Springer e-journals, and 24/7 quiet air-conditioned study capsules.',
      icon: 'fa-book-bookmark',
      features: ['24/7 Access Hours', 'IEEE & PubMed Subscriptions', 'Digital E-Reader Zones', 'Quiet Group Study Rooms']
    },
    hostel: {
      title: 'Eco-Friendly Hostels & Dining Hall',
      desc: 'Separate secure AC hostels for boys & girls with Wi-Fi, 4-tier security, gym, indoor games, and hygienic multi-cuisine dining hall.',
      icon: 'fa-hotel',
      features: ['Air-Conditioned Rooms', '24/7 Security & CCTV', 'Multi-Cuisine Mess', 'In-House Laundry & Gym']
    },
    sports: {
      title: 'Olympic-Standard Sports Arena',
      desc: 'Including a cricket stadium, synthetic basketball & tennis courts, indoor badminton courts, and an all-weather swimming pool.',
      icon: 'fa-volleyball',
      features: ['Floodlit Cricket Ground', 'Synthetic Tennis Courts', 'Indoor Swimming Pool', 'Gymnasium & Yoga Studio']
    }
  };

  campusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      campusTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-tab');
      const data = campusData[key];

      if (data && campusTextContent && campusGraphic) {
        campusGraphic.innerHTML = `
          <i class="fa-solid ${data.icon}"></i>
          <h4>${data.title}</h4>
        `;

        campusTextContent.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.desc}</p>
          <div class="campus-feature-list">
            ${data.features.map(f => `<div class="campus-feature-item"><i class="fa-solid fa-circle-check"></i> ${f}</div>`).join('')}
          </div>
          <button class="btn btn-gold" id="campus-modal-trigger">
            <i class="fa-solid fa-play"></i> Watch Virtual Campus Tour
          </button>
        `;

        // Rebind tour button
        const tourBtn = document.getElementById('campus-modal-trigger');
        if (tourBtn) {
          tourBtn.addEventListener('click', () => {
            showToast('Starting Virtual Tour Video Simulation...', 'info');
          });
        }
      }
    });
  });

  // Rebind initial tour button
  const initialTourBtn = document.getElementById('campus-modal-trigger');
  if (initialTourBtn) {
    initialTourBtn.addEventListener('click', () => {
      showToast('Starting Virtual Tour Video Simulation...', 'info');
    });
  }

  // ==========================================
  // STATS COUNT-UP ANIMATION
  // ==========================================

  const statsSection = document.getElementById('stats-bar');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function runStatsAnimation() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        if (target === 95) {
          stat.innerText = count + '%';
        } else {
          stat.innerText = count + '+';
        }
      }, 40);
    });
  }

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          runStatsAnimation();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // ==========================================
  // MODAL MANAGEMENT & TOASTS
  // ==========================================

  const applyModal = document.getElementById('apply-modal');
  const prospectusModal = document.getElementById('prospectus-modal');
  const closeApplyModalBtn = document.getElementById('close-apply-modal');
  const closeProspectusModalBtn = document.getElementById('close-prospectus-modal');

  function openApplyModal(courseName = '') {
    if (!applyModal) return;
    applyModal.classList.add('active');
    if (courseName) {
      const selectElem = applyModal.querySelector('select');
      if (selectElem) {
        for (let i = 0; i < selectElem.options.length; i++) {
          if (selectElem.options[i].text.toLowerCase().includes(courseName.toLowerCase())) {
            selectElem.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function closeModals() {
    if (applyModal) applyModal.classList.remove('active');
    if (prospectusModal) prospectusModal.classList.remove('active');
  }

  // Event Listeners for Open Modals
  document.getElementById('open-apply-modal-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('hero-apply-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('floating-apply-btn')?.addEventListener('click', () => openApplyModal());
  document.getElementById('cta-apply-btn')?.addEventListener('click', () => openApplyModal());

  document.getElementById('prospectus-top-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (prospectusModal) prospectusModal.classList.add('active');
  });

  document.getElementById('hero-download-prospectus-btn')?.addEventListener('click', () => {
    if (prospectusModal) prospectusModal.classList.add('active');
  });

  closeApplyModalBtn?.addEventListener('click', closeModals);
  closeProspectusModalBtn?.addEventListener('click', closeModals);

  // Close modal on backdrop click
  [applyModal, prospectusModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    }
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  // TOAST NOTIFICATIONS
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    let iconClass = 'fa-circle-check';
    if (type === 'info') iconClass = 'fa-circle-info';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // FORM SUBMISSION HANDLERS
  const heroForm = document.getElementById('hero-quick-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Enquiry Submitted! An Admissions Counselor will call you shortly.');
      heroForm.reset();
    });
  }

  const modalApplyForm = document.getElementById('modal-apply-form');
  if (modalApplyForm) {
    modalApplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModals();
      showToast('Application Registration Successful! Application ID: KBN-2026-' + Math.floor(1000 + Math.random() * 9000));
      modalApplyForm.reset();
    });
  }

  const prospectusForm = document.getElementById('prospectus-download-form');
  if (prospectusForm) {
    prospectusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModals();
      showToast('Prospectus PDF Download Initiated!', 'info');
      prospectusForm.reset();
    });
  }

  document.getElementById('cta-call-btn')?.addEventListener('click', () => {
    window.location.href = 'tel:+919319393212';
  });

  // Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#FFFFFF';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      }
    });
  }
});
