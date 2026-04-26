document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '<i data-lucide="x"></i>';
        document.body.style.overflow = 'hidden';
      } else {
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        document.body.style.overflow = '';
      }
      lucide.createIcons();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        document.body.style.overflow = '';
        lucide.createIcons();
      });
    });
  }
});

// Scroll reveal effect for sections
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.prop-card, .eco-card, .showcase-card, .philosophy, .final-cta').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(255, 255, 255, 0.9)';
    nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
  } else {
    nav.style.background = 'rgba(250, 250, 250, 0.8)';
    nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.03)';
  }
});
