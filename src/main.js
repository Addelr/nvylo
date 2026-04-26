document.addEventListener('DOMContentLoaded', () => {
  // Init Lucide icons
  lucide.createIcons();

  // ─── Mobile / Tablet Menu ───────────────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function openMenu() {
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('menu-open');
    // Swap to X icon
    menuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');
    // Swap back to hamburger icon
    menuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close on backdrop click
    if (navOverlay) {
      navOverlay.addEventListener('click', () => closeMenu());
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Reset when resized back to desktop
    window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });
  }
});

// ─── Scroll reveal effect ────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.prop-card, .eco-card, .showcase-card, .philosophy, .final-cta').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

// ─── Smooth scroll for anchor links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const hash = this.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      const navH = document.querySelector('nav')?.offsetHeight || 80;
      window.scrollTo({
        top: target.offsetTop - navH - 16,
        behavior: 'smooth'
      });
    }
  });
});

// ─── Navbar style on scroll ──────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(255, 255, 255, 0.9)';
      nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
    } else {
      nav.style.background = 'rgba(250, 250, 250, 0.8)';
      nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.03)';
    }
  }
}, { passive: true });
