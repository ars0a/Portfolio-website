// ================= ELEMENT REFERENCES =================
const sideMenu = document.querySelector('#sideMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], div[id]');

// ================= MOBILE MENU =================
function openMenu() {
  sideMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu() {
  sideMenu.style.transform = 'translateX(16rem)';
}

// ================= NAVBAR SHRINK ON SCROLL =================
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('nav-shrink');
  } else {
    navbar.classList.remove('nav-shrink');
  }
});

// ================= ACTIVE NAV LINK ON SCROLL =================
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const targetId = link.getAttribute('href')?.substring(1);
          link.classList.toggle('active', targetId === entry.target.id);
        });
      }
    });
  },
  {
    rootMargin: '-45% 0px -45% 0px'
  }
);

sections.forEach(section => sectionObserver.observe(section));

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
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('show');
  });
}
