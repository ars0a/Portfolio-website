// ===== UI SCRIPT =====

// Element references
const sideMenu = document.getElementById('sideMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

const certOverlay = document.getElementById('certOverlay');
const certFrame = document.getElementById('certFrame');



// ================= MOBILE MENU =================
function openMenu() {
  sideMenu.classList.remove('translate-x-full');
  sideMenu.classList.add('translate-x-0');
  
  // Disable snap scrolling when menu is open
  disableSnapScrolling();
  
document.documentElement.style.overflow = 'hidden';
sideMenu.style.pointerEvents = 'auto';

  
  // Add overlay backdrop for mobile menu
  const backdrop = document.createElement('div');
  backdrop.id = 'menuBackdrop';
  backdrop.className = 'fixed inset-0 bg-black/50 z-40 lg:hidden';
  backdrop.onclick = closeMenu;
  document.body.appendChild(backdrop);
}

function closeMenu() {
  sideMenu.classList.remove('translate-x-0');
  sideMenu.classList.add('translate-x-full');

  // Re-enable snap scrolling
  enableSnapScrolling();

  // Unlock page scroll PROPERLY for mobile
  document.documentElement.style.overflow = '';
  sideMenu.style.pointerEvents = '';

  // Remove backdrop
  const backdrop = document.getElementById('menuBackdrop');
  if (backdrop) backdrop.remove();
}


// Close menu when clicking navigation links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!sideMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !sideMenu.classList.contains('translate-x-full')) {
    closeMenu();
  }
});

// ================= NAVBAR SHRINK =================
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  // Add shrink class when scrolled down
  if (currentScroll > 40) {
    navbar.classList.add('nav-shrink');
  } else {
    navbar.classList.remove('nav-shrink');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// ================= ACTIVE NAV - IMPROVED FOR SNAP SCROLLING =================
// Use a more precise intersection observer for snap scrolling
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Only update if the section is mostly visible (more than 50% in viewport)
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, { 
  // Watch for when section occupies more than 50% of viewport
  threshold: [0.5, 0.75, 1.0],
  rootMargin: '0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ================= SMOOTH SCROLL TO SECTIONS =================
// Add smooth scroll behavior for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Temporarily disable snap for smoother programmatic scrolling
      disableSnapScrolling();
      
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Re-enable snap after scroll completes
      setTimeout(() => {
        enableSnapScrolling();
      }, 1000);
    }
  });
});

// ================= DARK MODE =================
const initTheme = () => {
  const isDark = localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
};
initTheme();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.theme = isDark ? 'dark' : 'light';
}


// ================= SKILL BAR ANIMATION ON SCROLL =================
const skillBarContainers = document.querySelectorAll('.skill-bar-container');

if (skillBarContainers.length > 0) {
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Trigger skill bar fill animation
        const skillBar = entry.target.querySelector('.skill-bar');
        if (skillBar && !skillBar.classList.contains('animated')) {
          skillBar.classList.add('animated');
        }
        
        // Unobserve after animation
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  skillBarContainers.forEach(container => {
    skillBarObserver.observe(container);
  });
}

// ================= INFO CARD ANIMATION ON SCROLL =================
const infoCards = document.querySelectorAll('.info-card');

if (infoCards.length > 0) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  infoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    cardObserver.observe(card);
  });
}

// ================= HERO SECTION ANIMATION =================
const heroElements = {
  profile: document.querySelector('.hero-profile'),
  badge: document.querySelector('.hero-badge'),
  intro: document.querySelector('.hero-intro'),
  headline: document.querySelector('.hero-headline'),
  status: document.querySelector('.hero-status'),
  description: document.querySelector('.hero-description'),
  buttons: document.querySelector('.hero-buttons'),
  social: document.querySelector('.hero-social')
};

// Check if we're on initial page load (hero section visible)
const isHeroVisible = () => {
  const heroSection = document.getElementById('top');
  if (!heroSection) return false;
  const rect = heroSection.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

// Trigger hero animations
function animateHero() {
  // Animate each element with the animate-in class
  Object.values(heroElements).forEach(element => {
    if (element) {
      element.classList.add('animate-in');
    }
  });
  
}

// Run animation on page load if hero is visible
if (isHeroVisible()) {
  // Small delay to ensure page is ready
  setTimeout(animateHero, 100);
} else {
  // If hero is not visible (unlikely), use intersection observer
  const heroSection = document.getElementById('top');
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !heroElements.profile.classList.contains('animate-in')) {
          animateHero();
          heroObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    heroObserver.observe(heroSection);
  }
}

// Optional: Re-trigger animation when user scrolls back to top
window.addEventListener('scroll', () => {
  if (window.scrollY === 0 && heroElements.profile && !heroElements.profile.classList.contains('animate-in')) {
    animateHero();
  }
}, { passive: true });

console.log('🎨 Hero section animations loaded');


// ================= EDUCATION ITEMS ANIMATION =================
const educationItems = document.querySelectorAll('.education-item');

if (educationItems.length > 0) {
  const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 200);
        educationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  educationItems.forEach(item => educationObserver.observe(item));
}

// ================= CERTIFICATE CARDS ANIMATION =================
const certCards = document.querySelectorAll('.cert-card');

if (certCards.length > 0) {
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
        certObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  certCards.forEach(card => certObserver.observe(card));
}

// ================= PROJECT CARDS ANIMATION =================
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        projectObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    projectObserver.observe(card);
  });
}

// ================= PUBLICATION CARDS ANIMATION =================
const publicationCards = document.querySelectorAll('.publication-card');

if (publicationCards.length > 0) {
  const publicationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 150);
        publicationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  publicationCards.forEach(card => publicationObserver.observe(card));
}

// ================= CERTIFICATE POPUP =================
function openLocalCert(src) {
  certFrame.innerHTML = `
    <img src="${src}" class="max-h-[85vh] max-w-full object-contain rounded-md" alt="Certificate" />
  `;
  certOverlay.classList.remove('hidden');
  certOverlay.classList.add('flex');
  
  // Disable snap and lock scroll when modal is open
  disableSnapScrolling();
  document.body.style.overflow = 'hidden';
}

function closeLocalCert() {
  certOverlay.classList.add('hidden');
  certOverlay.classList.remove('flex');
  certFrame.innerHTML = '';
  
  // Re-enable snap and unlock scroll
  enableSnapScrolling();
  document.body.style.overflow = '';
}

certOverlay.addEventListener('click', (e) => {
  if (e.target === certOverlay) closeLocalCert();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certOverlay.classList.contains('flex')) {
    closeLocalCert();
  }
});

// ================= LAZY LOAD FALLBACK =================
if (!('loading' in HTMLImageElement.prototype)) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.head.appendChild(script);
}