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
const BACKEND_URL = "https://portfolio-ai-backend-k0m4.onrender.com/chat";

// ================= ELEMENTS =================
const aiLog = document.getElementById("ai-chat-log");
const aiInput = document.getElementById("ai-chat-input");
const aiSend = document.getElementById("ai-chat-send");

const chatBtn = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const chatOverlay = document.getElementById("chatOverlay");
const chatClose = document.getElementById("chatClose");

// ================= UI HELPERS =================
function appendMessage(sender, text, isError = false) {
  const wrapper = document.createElement("div");
  const bubble = document.createElement("div");

  wrapper.className = `flex mb-1 ${sender === "You" ? "justify-end" : "justify-start"}`;

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

  aiLog.scrollTop = aiLog.scrollHeight;
}

function showTyping() {
  hideTyping();
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

// ================= CHAT CONTROL =================
function openChat() {
  chatBtn.style.opacity = "0";
  chatBtn.style.pointerEvents = "none";

  chatOverlay.classList.add("active");
  chatOverlay.classList.remove("hidden");
  chatOverlay.style.opacity = "1"; // ensure reset

  chatBox.style.transform = "translateY(0)";

  if (aiLog.children.length === 0) aiAutoGreet();
  aiInput.focus();

  setTimeout(() => {
    aiLog.scrollTop = aiLog.scrollHeight;
  }, 150);
}

function closeChat() {
  chatBtn.style.opacity = "1";
  chatBtn.style.pointerEvents = "auto";

  chatOverlay.classList.remove("active");
  chatOverlay.style.opacity = "1";

  if (window.innerWidth >= 768) {
    chatBox.style.transform = "translateY(calc(100% + 20px))";
  } else {
    chatBox.style.transform = "translateY(100%)";
  }

  setTimeout(() => {
    if (!chatOverlay.classList.contains("active")) chatOverlay.classList.add("hidden");
  }, 300);
}

// ================= SWIPE TO CLOSE (MOBILE) =================
(function enableSwipeToClose() {
  const chatHeader = document.querySelector('.chat-header');
  if (!chatHeader) return;

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const handleTouchStart = (e) => {
    if (window.innerWidth >= 768) return;
    if (!e.target.closest('.chat-header')) return;

    isDragging = true;
    startY = e.touches[0].clientY;
    currentY = startY;

    chatBox.style.transition = 'none';
    chatOverlay.style.transition = 'none';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      chatBox.style.transform = `translateY(${deltaY}px)`;
      chatOverlay.style.opacity = Math.max(0.3, 1 - (deltaY / 400));
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const deltaY = currentY - startY;

    chatBox.style.transition = '';
    chatOverlay.style.transition = '';

    if (deltaY > 100) {
      closeChat();
    } else {
      chatBox.style.transform = 'translateY(0)';
      chatOverlay.style.opacity = '1';
    }
  };

  chatHeader.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
})();

// ================= EVENT BINDINGS =================
chatBtn.addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);
chatOverlay.addEventListener("click", closeChat);

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
  appendMessage("Debs", "Hi, my name is Debs, your AI assistant. How may I help you today?");
}

// ================= INPUT EVENTS =================
aiSend.addEventListener("click", aiSendMessage);
aiInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") aiSendMessage();
});

// ================= KEYBOARD SAFE BEHAVIOR (MOBILE) =================
(function enableKeyboardSafeChat() {
  if (!window.visualViewport) return;

  const adjustForKeyboard = () => {
    const vv = window.visualViewport;
    const inputArea = chatBox.querySelector('.input-area');
    if (!inputArea) return;

    const keyboardOpen = vv.height < window.innerHeight;

    if (keyboardOpen) {
      const bottomOffset = window.innerHeight - vv.height - vv.offsetTop;
      inputArea.style.transform = `translateY(-${bottomOffset}px)`;
    } else {
      inputArea.style.transform = 'translateY(0)';
    }
  };

  let vhTimer;
  const applyViewportHeight = () => {
    clearTimeout(vhTimer);
    vhTimer = setTimeout(() => {
      if (window.innerWidth >= 768) return;
      const vv = visualViewport;
      chatBox.style.height = `${vv.height}px`;
      chatBox.style.maxHeight = `${vv.height}px`;
    }, 50);
  };

  visualViewport.addEventListener("resize", adjustForKeyboard);
  visualViewport.addEventListener("scroll", adjustForKeyboard);

  visualViewport.addEventListener("resize", applyViewportHeight);
  visualViewport.addEventListener("scroll", applyViewportHeight);

  applyViewportHeight();
})();
