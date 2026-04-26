// Wait for Lucide to be available (loaded via defer script tag)
function initLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLucide();

  // ─── Mobile / Tablet Menu Toggle ────────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function openMenu() {
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('menu-open');

    // Swap icon: menu → x
    menuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');

    // Swap icon: x → menu
    menuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }

  if (menuToggle && navLinks) {
    // Toggle on hamburger click
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('active');
      isOpen ? closeMenu() : openMenu();
    });

    // Close when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close when clicking the backdrop overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', () => closeMenu());
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        menuToggle.focus(); // Return focus to trigger element
      }
    });

    // Reset menu state on resize to desktop (≥ 1025px) to avoid stuck state
    const mq = window.matchMedia('(min-width: 1025px)');
    function handleResize(e) {
      if (e.matches) {
        closeMenu();
      }
    }
    mq.addEventListener('change', handleResize);
  }

  // ─── Scroll reveal effect for sections ──────────────────────────────────────
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Animate once only
      }
    });
  }, observerOptions);

  document.querySelectorAll('.prop-card, .eco-card, .showcase-card, .philosophy, .final-cta').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // ─── Smooth scroll for anchor links ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash === '#') return; // Allow bare # to do nothing
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const nav = document.querySelector('nav');
        const navH = nav ? nav.offsetHeight : 80;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Navbar style on scroll ──────────────────────────────────────────────────
  const mainNav = document.getElementById('main-nav');
  function handleScroll() {
    if (mainNav) {
      mainNav.classList.toggle('scrolled', window.scrollY > 20);
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on load
});
