// ================= ELEMENT REFERENCES =================
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
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  sideMenu.classList.remove('translate-x-0');
  sideMenu.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !sideMenu.classList.contains('translate-x-full')) {
    closeMenu();
  }
});

// ================= NAVBAR SHRINK =================
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('nav-shrink');
  } else {
    navbar.classList.remove('nav-shrink');
  }
}, { passive: true });

// ================= ACTIVE NAV =================
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

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

// ================= CERTIFICATE POPUP =================
function openLocalCert(src) {
  certFrame.innerHTML = `
    <img src="${src}" class="max-h-[85vh] max-w-full object-contain rounded-md" />
  `;
  certOverlay.classList.remove('hidden');
  certOverlay.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLocalCert() {
  certOverlay.classList.add('hidden');
  certOverlay.classList.remove('flex');
  certFrame.innerHTML = '';
  document.body.style.overflow = '';
}


certOverlay.addEventListener('click', (e) => {
  if (e.target === certOverlay) closeLocalCert();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLocalCert();
});

// ================= LAZY LOAD FALLBACK =================
if (!('loading' in HTMLImageElement.prototype)) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ================= PRELOAD =================
['./images/profile-img.png','./images/logo-dark-normalized.png','./images/logo-light-normalized.png']
  .forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });


// ================= AI CHAT LOGIC =================

const aiLog = document.getElementById("ai-chat-log");
const aiInput = document.getElementById("ai-chat-input");
const aiSend = document.getElementById("ai-chat-send");

// helpers
function appendMessage(sender, text, isError = false) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  if (isError) div.style.color = "red";
  aiLog.appendChild(div);
  aiLog.scrollTop = aiLog.scrollHeight;
}

async function aiSendMessage() {
  const message = aiInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  aiInput.value = "";

  try {
    const res = await fetch("https://portfolio-ai-backend-wg2g.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      appendMessage("Error", `Backend returned ${res.status}`, true);
      return;
    }

    const data = await res.json();
    const reply = data?.reply || "No response from AI";
    appendMessage("Bot", reply);

  } catch (err) {
    appendMessage("Error", "Failed to reach AI backend", true);
  }
}

// events
aiSend.addEventListener("click", aiSendMessage);
aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter") aiSendMessage();
});
