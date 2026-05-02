
// ── Navbar scroll behaviour ──────────────────────────────────
// ── Navbar scroll behaviour ──────────────────────────────────
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
 
  function updateNav() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }
 
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
})();
 
// ── Mobile hamburger menu ────────────────────────────────────
// Uses event delegation + MutationObserver to handle
// nav HTML injected dynamically by components.js
(function () {
 
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu || hamburger._menuInit) return;
 
    // Mark as initialised so we don't double-bind
    hamburger._menuInit = true;
 
    function openMenu() {
      mobileMenu.classList.add('open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
 
    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
 
    function toggleMenu(e) {
      e.stopPropagation();
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    }
 
    // Click handler
    hamburger.addEventListener('click', toggleMenu);
 
    // Touch handler for iOS (eliminates 300ms delay)
    hamburger.addEventListener('touchend', function (e) {
      e.preventDefault();
      toggleMenu(e);
    }, { passive: false });
 
    // Close when any nav link is tapped
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
     
    });
 
    // Close when tapping outside
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
 
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
 
    console.log('✅ Hamburger menu initialised');
  }
 
  // 1. Listen for components.js finishing injection — most reliable
  document.addEventListener('componentsReady', initHamburger);
 
  // 2. MutationObserver fallback — catches DOM changes
  const observer = new MutationObserver(() => initHamburger());
  observer.observe(document.body, { childList: true, subtree: false });
 
  // 3. DOMContentLoaded fallback
  document.addEventListener('DOMContentLoaded', initHamburger);
 
  // 4. Window load — last resort
  window.addEventListener('load', initHamburger);
 
  // 5. Try immediately in case already rendered
  initHamburger();
 
})();
 // ── Back-to-top button ───────────────────────────────────────
(function () {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
 
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
 
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── Scroll-triggered animations ─────────────────────────────
(function () {
  const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

// ── FAQ accordion ────────────────────────────────────────────
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── Booking confirmation modal ───────────────────────────────
(function () {
  const overlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');
  const bookingForms = document.querySelectorAll('.booking-form, .quick-form');

  if (!overlay) return;

  function showModal() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();

// ── Newsletter form ───────────────────────────────────────────
(function () {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2a7a2a';
      if (input) input.value = '';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    });
  });
})();

// ── Counter animation ─────────────────────────────────────────
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ── Active nav link ───────────────────────────────────────────
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });
})();

// ── Contact form ──────────────────────────────────────────────
(function () {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2a7a2a';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 3000);
  });
})();
// Double-click logo to access admin
document.addEventListener('dblclick', (e) => {
  if (e.target.closest('.nav-logo')) {
    window.location.href = '/admin-login.html';
  }
});
