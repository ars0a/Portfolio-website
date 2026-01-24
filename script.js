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


// ================= CONFIG =================
// const BACKEND_URL = "http://127.0.0.1:3001/chat";
const BACKEND_URL = "https://portfolio-ai-backend-wg2g.onrender.com/chat";


// ================= ELEMENTS =================
const aiLog = document.getElementById("ai-chat-log");
const aiInput = document.getElementById("ai-chat-input");
const aiSend = document.getElementById("ai-chat-send");

// ================= UI HELPERS =================

function appendMessage(sender, text, isError = false) {
  const wrapper = document.createElement("div");
  const bubble = document.createElement("div");

  // alignment (You = right, Debs = left)
  wrapper.className = `flex mb-1 ${sender === "You" ? "justify-end" : "justify-start"}`;

  // bubble styling
  bubble.className = `
    inline-block max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-line
    ${isError
      ? "bg-red-600 text-white"
      : sender === "You"
        ? "bg-purple-600 text-white"
        : "bg-gray-200 text-black dark:bg-darkHover/40 dark:text-white"
    }
  `;

  bubble.textContent = text;
  
  wrapper.appendChild(bubble);
  aiLog.appendChild(wrapper);

  // auto scroll to bottom
  aiLog.scrollTop = aiLog.scrollHeight;
}

function showTyping() {
  hideTyping(); // prevent duplicates

  const typing = document.createElement("div");
  typing.id = "ai-typing";
  typing.className = "text-xs italic text-gray-500 dark:text-gray-400 mt-1";
  typing.textContent = "Debs is typing...";

  aiLog.appendChild(typing);
  aiLog.scrollTop = aiLog.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("ai-typing");
  if (typing) typing.remove();
}


// ================= CHATBOX TOGGLE =================

const chatBtn = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");

chatBtn.onclick = () => {
  chatBox.classList.remove("hidden");

  // Only greet if chat is empty
  if (aiLog.children.length === 0) {
    aiAutoGreet();
  }

  aiInput.focus();
};


chatClose.onclick = () => {
  chatBox.classList.add("hidden");
};

// ================= AI SEND LOGIC =================
async function aiSendMessage() {
  const message = aiInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  aiInput.value = "";

  showTyping();

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    hideTyping();

    if (!res.ok) {
      appendMessage("Error", `Backend returned ${res.status}`, true);
      return;
    }

    const data = await res.json();
    appendMessage("Debs", data?.reply || "No response");

  } catch (err) {
    hideTyping();
    appendMessage("Error", "Failed to reach AI backend", true);
  }
}

// ================= AUTO GREETING =================
function aiAutoGreet() {
  appendMessage("Debs", "Hi, my name is Debs, an AI assistant. How may I help you today?");
}

// ================= EVENTS =================
aiSend.addEventListener("click", aiSendMessage);
aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter") aiSendMessage();
});


