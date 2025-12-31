// ================= ELEMENT REFERENCES =================
const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector('nav');
const navLinks = document.querySelector('nav ul'); // may be null on mobile

// ================= MOBILE MENU =================
function openMenu() {
  sideMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu() {
  sideMenu.style.transform = 'translateX(16rem)';
}

// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navBar.classList.add(
      'bg-white',
      'bg-opacity-50',
      'backdrop-blur-lg',
      'shadow-sm',
      'dark:bg-darkTheme',
      'dark:shadow-white/20'
    );

    if (navLinks) {
      navLinks.classList.remove(
        'bg-white',
        'shadow-sm',
        'bg-opacity-50',
        'dark:border',
        'dark:border-white/50',
        'dark:bg-transparent'
      );
    }

  } else {
    navBar.classList.remove(
      'bg-white',
      'bg-opacity-50',
      'backdrop-blur-lg',
      'shadow-sm',
      'dark:bg-darkTheme',
      'dark:shadow-white/20'
    );

    if (navLinks) {
      navLinks.classList.add(
        'bg-white',
        'shadow-sm',
        'bg-opacity-50',
        'dark:border',
        'dark:border-white/50',
        'dark:bg-transparent'
      );
    }
  }
});

// ================= DARK / LIGHT MODE =================
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.theme = document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
}

// ================= SCROLL REVEAL (IntersectionObserver) =================

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  // Reduced motion: show everything immediately
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('show');
  });
}
