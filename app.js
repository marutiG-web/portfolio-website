/**
 * MARUTI GHORPADE - PORTFOLIO INTERACTIVE SCRIPT ENGINE
 * Vanilla JS, modern, dependency-free, high-performance interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initScrollEffects();
  initMobileMenu();
  initTerminalTyper();
  initInteractiveDashboard();
  initProjectFilter();
  initContactForm();
});

/* ==========================================================================
   SCROLL EFFECTS & NAVIGATION
   ========================================================================== */
function initScrollEffects() {
  const header = document.querySelector('header');
  const scrollBtn = document.querySelector('.scroll-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header & Scroll-to-top button visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }

    // Scroll Spy: Highlight active nav link
    let currentId = '';
    const scrollPos = window.scrollY + 120; // Offset for sticky nav

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Scroll to top click
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll-driven Fade-in elements (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in-element');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver not supported
    fadeElements.forEach(el => el.classList.add('visible'));
  }
}

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scrolling when mobile menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   TERMINAL TYPER (HERO ANIMATION)
   ========================================================================== */
function initTerminalTyper() {
  const typerTextElement = document.querySelector('.terminal-typer span');
  if (!typerTextElement) return;

  const roles = [
    'Web Developer',
    'Data Analyst',
    'Full Stack Engineer',
    'Data Visualizer'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typerTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40; // Faster deleting speed
    } else {
      typerTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full term
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 1000);
}

/* ==========================================================================
   INTERACTIVE DATA DASHBOARD (SIGNATURE ANALYST FEATURE)
   ========================================================================== */
function initInteractiveDashboard() {
  const tabs = document.querySelectorAll('.dashboard-widget .tab-btn');
  const chartPath = document.querySelector('.dashboard-widget .chart-line');
  const chartFillPath = document.querySelector('.dashboard-widget .chart-fill');
  
  const metricValues = {
    performance: [
      { label: 'Page Load Speed', value: '0.4s', trend: '+98%', trendClass: 'up' },
      { label: 'Accessibility Score', value: '100/100', trend: 'Perfect', trendClass: 'up' },
      { label: 'SEO Audit Score', value: '100/100', trend: 'Top Tier', trendClass: 'up' },
      { label: 'Core Web Vitals', value: 'Passed', trend: 'Healthy', trendClass: 'up' }
    ],
    models: [
      { label: 'Model Accuracy', value: '96.2%', trend: '+4.5%', trendClass: 'up' },
      { label: 'Training Efficiency', value: '14.2m', trend: '-22%', trendClass: 'up' },
      { label: 'Dataset Capacity', value: '14.5M+', trend: 'Rows', trendClass: 'up' },
      { label: 'Predictive Lift', value: '1.8x', trend: 'Optimized', trendClass: 'up' }
    ],
    impact: [
      { label: 'Client Satisfaction', value: '100%', trend: '5/5 Stars', trendClass: 'up' },
      { label: 'Code Refactor Savings', value: '-35%', trend: 'Overhead', trendClass: 'up' },
      { label: 'Projects Completed', value: '24+', trend: 'Production', trendClass: 'up' },
      { label: 'Hours Coded', value: '3,200+', trend: 'Active', trendClass: 'up' }
    ]
  };

  // SVG Chart path coordinates representing different datasets
  const chartData = {
    performance: {
      line: 'M 10,150 C 40,110 80,120 120,70 C 160,20 200,40 240,15 C 280,-10 320,10 360,8 C 400,6 440,4 480,5',
      fill: 'M 10,150 C 40,110 80,120 120,70 C 160,20 200,40 240,15 C 280,-10 320,10 360,8 C 400,6 440,4 480,5 L 480,180 L 10,180 Z'
    },
    models: {
      line: 'M 10,160 C 40,140 80,150 120,110 C 160,70 200,85 240,55 C 280,25 320,30 360,22 C 400,14 440,12 480,10',
      fill: 'M 10,160 C 40,140 80,150 120,110 C 160,70 200,85 240,55 C 280,25 320,30 360,22 C 400,14 440,12 480,10 L 480,180 L 10,180 Z'
    },
    impact: {
      line: 'M 10,170 C 40,150 80,110 120,120 C 160,130 200,90 240,60 C 280,30 320,40 360,15 C 400,-10 440,2 480,1',
      fill: 'M 10,170 C 40,150 80,110 120,120 C 160,130 200,90 240,60 C 280,30 320,40 360,15 C 400,-10 440,2 480,1 L 480,180 L 10,180 Z'
    }
  };

  function updateDashboardMetrics(category) {
    const cards = document.querySelectorAll('.dashboard-widget .metric-card');
    const data = metricValues[category];

    cards.forEach((card, index) => {
      if (!data[index]) return;
      
      const label = card.querySelector('.metric-label');
      const val = card.querySelector('.metric-value');
      const trend = card.querySelector('.metric-trend');

      // Seamless text fade animation
      card.style.opacity = '0.3';
      card.style.transform = 'translateY(5px)';
      card.style.transition = 'opacity 0.2s, transform 0.2s';

      setTimeout(() => {
        label.textContent = data[index].label;
        val.textContent = data[index].value;
        trend.textContent = data[index].trend;
        
        // Remove existing trend classes and add current
        trend.className = 'metric-trend';
        trend.classList.add(data[index].trendClass);
        
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200);
    });

    // Update SVG charts with smooth path interpolation
    if (chartPath && chartFillPath) {
      chartPath.setAttribute('d', chartData[category].line);
      chartFillPath.setAttribute('d', chartData[category].fill);
    }
  }

  // Bind tab buttons
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const category = tab.getAttribute('data-tab');
      updateDashboardMetrics(category);
    });
  });

  // Trigger default load (performance)
  updateDashboardMetrics('performance');
}

/* ==========================================================================
   PROJECT GRID CATEGORY FILTER
   ========================================================================== */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          // Show project
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          // Hide project
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95) translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const successOverlay = document.querySelector('.form-success-overlay');
  const resetBtn = document.querySelector('.success-reset-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather input fields
      const nameInput = form.querySelector('#name');
      const emailInput = form.querySelector('#email');
      const messageInput = form.querySelector('#message');
      const submitBtn = form.querySelector('.btn-primary');
      
      let hasError = false;

      // Reset styles
      [nameInput, emailInput, messageInput].forEach(input => {
        if (input) {
          input.style.borderColor = '';
        }
      });

      // Validations
      if (nameInput && nameInput.value.trim() === '') {
        nameInput.style.borderColor = '#ff2525';
        hasError = true;
      }
      
      if (emailInput && (emailInput.value.trim() === '' || !validateEmail(emailInput.value))) {
        emailInput.style.borderColor = '#ff2525';
        hasError = true;
      }

      if (messageInput && messageInput.value.trim() === '') {
        messageInput.style.borderColor = '#ff2525';
        hasError = true;
      }

      if (hasError) return;

      // Simulate API submit with premium UX feedback
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>Transmitting data...</span>
      `;

      // CSS keyframe injection for loading spinner
      if (!document.getElementById('spin-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spin-keyframes';
        style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        // Trigger success panel overlay
        if (successOverlay) {
          successOverlay.classList.add('active');
          form.reset();
        }
        
        // Restore submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // Handle message another reset button
  if (resetBtn && successOverlay) {
    resetBtn.addEventListener('click', () => {
      successOverlay.classList.remove('active');
    });
  }

  // Email helper regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
