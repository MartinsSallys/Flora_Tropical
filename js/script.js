document.addEventListener('DOMContentLoaded', () => {
  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HERO SLIDER */
  /* ═══════════════════════════════════════════════════════════════════════ */
  const slides = document.querySelectorAll('[data-slide]');
  const dots = document.querySelectorAll('[data-dot]');
  let activeSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });
  }

  function autoPlaySlides() {
    slideInterval = setInterval(() => {
      activeSlide = (activeSlide + 1) % slides.length;
      showSlide(activeSlide);
    }, 5200);
  }

  if (dots.length && slides.length) {
    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        activeSlide = index;
        showSlide(activeSlide);
        
        // Reset autoplay when manually clicking
        clearInterval(slideInterval);
        autoPlaySlides();
      });
    });

    // Start autoplay
    autoPlaySlides();
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE MENU */
  /* ═══════════════════════════════════════════════════════════════════════ */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      updateMenuIcon();
    });

    // Close menu when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        updateMenuIcon();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        updateMenuIcon();
      }
    });

    // Update menu icon based on state
    function updateMenuIcon() {
      const isActive = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isActive);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SMOOTH SCROLL FOR ANCHOR LINKS */
  /* ═══════════════════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close menu if open
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* INTERSECTION OBSERVER FOR ANIMATIONS */
  /* ═══════════════════════════════════════════════════════════════════════ */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with fadeUp class
  document.querySelectorAll('.reveal, .fade-in').forEach(el => {
    observer.observe(el);
  });
});
