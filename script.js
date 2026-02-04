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
  document.body.style.overflow = '';
  
  // Remove backdrop
  const backdrop = document.getElementById('menuBackdrop');
  if (backdrop) backdrop.remove();
}

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

// ================= ACTIVE NAV =================
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
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
  if (e.key === 'Escape' && certOverlay.classList.contains('flex')) {
    closeLocalCert();
  }
});

// ================= LAZY LOAD FALLBACK =================
if (!('loading' in HTMLImageElement.prototype)) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ================= PRELOAD CRITICAL IMAGES =================
['./images/profile-img.png','./images/logo-dark-normalized.png','./images/logo-light-normalized.png']
.forEach(src => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
});

// ================= SMOOTH SCROLL ENHANCEMENT =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Close mobile menu if open
      if (!sideMenu.classList.contains('translate-x-full')) {
        closeMenu();
      }
    } else {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (!sideMenu.classList.contains('translate-x-full')) {
          closeMenu();
        }
      }
    }
  });
});

// ================= AI CHAT SYSTEM =================

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

const inputArea = document.querySelector(".input-area");

// ================= HELPERS =================
function appendMessage(sender, text, isError = false) {
  const wrapper = document.createElement("div");
  const bubble = document.createElement("div");
  wrapper.className = `flex mb-3 ${sender === "You" ? "justify-end" : "justify-start"}`;
  bubble.className = `
    inline-block max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed
    ${isError ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
      : sender === "You" 
        ? "bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white shadow-md"
        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm"}
  `;
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  aiLog.appendChild(wrapper);
  
  // Smooth scroll to bottom with a slight delay for better UX
  setTimeout(() => {
    aiLog.scrollTo({
      top: aiLog.scrollHeight,
      behavior: 'smooth'
    });
  }, 100);
}

function showTyping() {
  hideTyping();
  const typing = document.createElement("div");
  typing.id = "ai-typing";
  typing.className = "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 ml-2 mb-3";
  typing.innerHTML = `
    <div class="flex gap-1">
      <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
      <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
      <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
    </div>
    <span>Debs is typing...</span>
  `;
  aiLog.appendChild(typing);
  
  // Smooth scroll to show typing indicator
  setTimeout(() => {
    aiLog.scrollTo({
      top: aiLog.scrollHeight,
      behavior: 'smooth'
    });
  }, 50);
}

function hideTyping() {
  const typing = document.getElementById("ai-typing");
  if (typing) typing.remove();
}

// ================= CHAT OPEN/CLOSE =================
function openChat() {
  chatBtn.style.opacity = "0";
  chatBtn.style.pointerEvents = "none";

  chatOverlay.classList.add("active");
  chatBox.classList.add("active");

  // Lock scroll only on mobile
  if (window.innerWidth < 768) {
    document.body.style.overflow = "hidden";
  }

  setTimeout(() => {
    aiInput.focus();
    // Ensure chat is scrolled to bottom
    if (aiLog) {
      aiLog.scrollTop = aiLog.scrollHeight;
    }
  }, 150);

  if (aiLog.children.length === 0) aiAutoGreet();
}

function closeChat() {
  chatOverlay.classList.remove("active");
  chatBox.classList.remove("active");

  if (window.innerWidth < 768) {
    document.body.style.overflow = "";
  }

  // Reset keyboard transforms
  resetKeyboardFix();

  setTimeout(() => {
    chatBtn.style.opacity = "1";
    chatBtn.style.pointerEvents = "auto";
  }, 300);
}

// ================= FULL-PANEL SWIPE (MOBILE) =================
(function swipeClose() {
  let startY = 0;
  let currentY = 0;
  let dragging = false;
  const threshold = 120;
  const fadeFactor = 400;

  const isMobile = () => window.innerWidth < 768;

  const onStart = (e) => {
    if (!isMobile()) return;
    
    // Only allow swipe from header area
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader && chatHeader.contains(e.target)) {
      dragging = true;
      startY = e.touches[0].clientY;
      currentY = startY;
      chatBox.style.transition = "none";
      chatOverlay.style.transition = "none";
    }
  };

  const onMove = (e) => {
    if (!dragging || !isMobile()) return;

    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      e.preventDefault();
      chatBox.style.transform = `translateY(${deltaY}px)`;
      const opacity = Math.max(0, 1 - deltaY / fadeFactor);
      chatOverlay.style.opacity = opacity;
    }
  };

  const onEnd = () => {
    if (!dragging || !isMobile()) return;
    dragging = false;

    const deltaY = currentY - startY;
    chatBox.style.transition = "transform .25s ease-out";
    chatOverlay.style.transition = "opacity .25s ease-out";

    if (deltaY > threshold) {
      closeChat();
    } else {
      chatBox.style.transform = "translateY(0)";
      chatOverlay.style.opacity = "1";
    }
  };

  chatBox.addEventListener("touchstart", onStart, { passive: true });
  chatBox.addEventListener("touchmove", onMove, { passive: false });
  chatBox.addEventListener("touchend", onEnd, { passive: true });
})();

// ================= MOBILE KEYBOARD HANDLING =================
if (window.visualViewport) {
  const viewport = window.visualViewport;

  const keyboardAdjust = () => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile || !chatBox.classList.contains('active')) {
      return resetKeyboardFix();
    }

    // Calculate keyboard height
    const visualHeight = viewport.height;
    const windowHeight = window.innerHeight;
    const keyboardHeight = windowHeight - visualHeight;

    if (keyboardHeight > 100) {
      // Keyboard is open
      if (chatBox) {
        chatBox.style.paddingBottom = `${keyboardHeight}px`;
      }
      
      // Add extra padding to message area
      if (aiLog) {
        aiLog.style.paddingBottom = `${keyboardHeight + 20}px`;
        // Scroll to bottom to show latest message
        setTimeout(() => {
          aiLog.scrollTop = aiLog.scrollHeight;
        }, 100);
      }
    } else {
      // Keyboard is closed
      resetKeyboardFix();
    }
  };

  // Listen for viewport changes
  viewport.addEventListener("resize", keyboardAdjust);
  viewport.addEventListener("scroll", keyboardAdjust);
  
  // Also listen to input focus events
  if (aiInput) {
    aiInput.addEventListener("focus", () => {
      setTimeout(keyboardAdjust, 300);
    });
    aiInput.addEventListener("blur", () => {
      setTimeout(resetKeyboardFix, 100);
    });
  }
}

function resetKeyboardFix() {
  if (chatBox) chatBox.style.paddingBottom = "";
  if (aiLog) aiLog.style.paddingBottom = "";
  if (inputArea) inputArea.style.transform = "";
}

// ================= EVENTS =================
if (chatBtn) chatBtn.addEventListener("click", openChat);
if (chatClose) chatClose.addEventListener("click", closeChat);
if (chatOverlay) chatOverlay.addEventListener("click", (e) => {
  if (e.target === chatOverlay) closeChat();
});

// ================= SEND LOGIC =================
async function aiSendMessage() {
  const message = aiInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  aiInput.value = "";
  aiInput.style.height = 'auto'; // Reset textarea height if using textarea
  showTyping();

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message})
    });

    hideTyping();

    if (!res.ok) {
      appendMessage("Error", `Backend returned ${res.status}. Please try again.`, true);
      return;
    }

    const data = await res.json();
    appendMessage("Debs", data?.reply || "No response received.");
  } catch (err) {
    hideTyping();
    console.error('Chat error:', err);
    appendMessage("Error", "Failed to reach AI backend. Please check your connection and try again.", true);
  }
}

// ================= GREET =================
function aiAutoGreet() {
  setTimeout(() => {
    appendMessage("Debs", "Hi! I'm Debs, your AI assistant. I can help answer questions about Aditya's experience, skills, and projects. How can I help you today?");
  }, 500);
}

// ================= INPUT EVENTS =================
if (aiSend) {
  aiSend.addEventListener("click", aiSendMessage);
}

if (aiInput) {
  aiInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      aiSendMessage();
    }
  });

  // Auto-resize input if it's a textarea (optional enhancement)
  aiInput.addEventListener("input", () => {
    aiInput.style.height = 'auto';
    aiInput.style.height = aiInput.scrollHeight + 'px';
  });
}

// ================= PERFORMANCE OPTIMIZATION =================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    // Any scroll-based animations can be added here
  });
}, { passive: true });

// Log page load performance
window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`✨ Portfolio loaded in ${pageLoadTime}ms`);
  }
});

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth >= 1024 && !sideMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
    // Reset chat keyboard fixes on resize
    if (chatBox && chatBox.classList.contains('active')) {
      resetKeyboardFix();
    }
  }, 250);
});

// Prevent chat overlay from closing when clicking inside chat box
if (chatBox) {
  chatBox.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

console.log('🚀 Portfolio JavaScript loaded successfully');