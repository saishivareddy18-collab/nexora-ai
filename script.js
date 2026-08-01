// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Config =====
const BACKEND_URL = "https://nexora-ai-backend-k2rr.onrender.com/api/chat";

// ===== Sample problem data (replace with a real fetch from your backend) =====
let problems = [
  {
    title: "Two Sum",
    difficulty: "easy",
    description: "Given an array of integers and a target, return indices of the two numbers that add up to target.",
  },
  {
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    description: "Return the longest substring of s that reads the same forwards and backwards.",
  },
  {
    title: "Merge K Sorted Lists",
    difficulty: "hard",
    description: "Merge k sorted linked lists into one sorted list and return its head.",
  },
  {
    title: "Valid Parentheses",
    difficulty: "easy",
    description: "Determine if a string of brackets is valid using a stack.",
  },
  {
    title: "Course Schedule",
    difficulty: "medium",
    description: "Determine if you can finish all courses given prerequisite pairs (cycle detection in a graph).",
  },
];

const problemGrid = document.getElementById("problemGrid");
const tabs = document.querySelectorAll(".tab");

function renderProblems(filter = "all") {
  problemGrid.innerHTML = "";
  const filtered = filter === "all" ? problems : problems.filter(p => p.difficulty === filter);

  if (filtered.length === 0) {
    problemGrid.innerHTML = `<p style="color:var(--text-dim);">No problems in this difficulty yet.</p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "problem-card";
    card.innerHTML = `
      <div class="problem-card-top">
        <h3>${escapeHTML(p.title)}</h3>
        <span class="difficulty-badge ${p.difficulty}">${p.difficulty}</span>
      </div>
      <p>${escapeHTML(p.description)}</p>
    `;
    problemGrid.appendChild(card);
  });
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderProblems(tab.dataset.filter);
  });
});

renderProblems();

// ===== Add problem modal =====
const modalOverlay = document.getElementById("modalOverlay");
const addProblemBtn = document.getElementById("addProblemBtn");
const modalClose = document.getElementById("modalClose");
const problemForm = document.getElementById("problemForm");

addProblemBtn.addEventListener("click", () => modalOverlay.classList.add("open"));
modalClose.addEventListener("click", () => modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("open");
});

problemForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("pTitle").value.trim();
  const difficulty = document.getElementById("pDifficulty").value;
  const description = document.getElementById("pDescription").value.trim();
  // starter code captured but not rendered in the card — wire this to your backend's
  // problem-creation endpoint (e.g. POST /api/problems) to persist it.

  if (!title || !description) return;

  problems.unshift({ title, difficulty, description });
  problemForm.reset();
  modalOverlay.classList.remove("open");

  // reset to "all" tab so the new problem is visible
  tabs.forEach(t => t.classList.remove("active"));
  tabs[0].classList.add("active");
  renderProblems("all");
});

// ===== Hero terminal — cycles through sample prompts =====
const demoLines = [
  { q: "explain quicksort time complexity", a: "Average case O(n log n), worst case O(n²) on already-sorted input with a poor pivot choice. Use median-of-three to avoid it." },
  { q: "why is my binary search off by one?", a: "Check your loop condition — using `<=` with `mid = (lo+hi)/2` and not updating `hi = mid - 1` on the high branch is the classic culprit." },
  { q: "difference between BFS and DFS?", a: "BFS explores level by level using a queue — best for shortest path. DFS goes deep using a stack/recursion — best for exploring all paths or detecting cycles." },
];

let demoIndex = 0;
const terminalBody = document.getElementById("terminalBody");

function cycleDemo() {
  demoIndex = (demoIndex + 1) % demoLines.length;
  const { q, a } = demoLines[demoIndex];
  terminalBody.innerHTML = `
    <div class="term-line"><span class="prompt">&gt;</span> ${escapeHTML(q)}</div>
    <div class="term-line term-response">${escapeHTML(a)}</div>
    <div class="term-line"><span class="prompt">&gt;</span> <span class="typing-cursor">▌</span></div>
  `;
}

setInterval(cycleDemo, 6000);

// ===== Chat wired to backend =====
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatWindow = document.getElementById("chatWindow");
const chatStatus = document.getElementById("chatStatus");

function appendMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `chat-msg chat-msg-${type}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msg;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  chatInput.value = "";

  const loadingMsg = appendMessage("Thinking…", "ai");

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data.success) {
      loadingMsg.textContent = data.data;
    } else {
      loadingMsg.textContent = data.error || "Something went wrong. Try again.";
      loadingMsg.className = "chat-msg chat-msg-error";
    }
  } catch (err) {
    loadingMsg.textContent = "Couldn't reach Nexora's server. It may be waking up — try again in a few seconds.";
    loadingMsg.className = "chat-msg chat-msg-error";
  }
});
/* ================================================================
   NEXORA AI — INTERACTIONS
   Pairs with style.css. Vanilla JS, no dependencies.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbarScroll();
  initScrollReveal();
  initTypingEffect();
  initParticles();
  initMouseGlow();
  initTiltCards();
  initCounters();
});

/* ---------- Loading screen ---------- */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  window.addEventListener('load', () => {
    setTimeout(() => screen.classList.add('is-hidden'), 400);
  });
}

/* ---------- Navbar shrink-on-scroll ---------- */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach((item, i) => {
    item.style.setProperty('--i', i % 6);
    observer.observe(item);
  });
}

/* ---------- AI typing effect ---------- */
/* Add data-typing="Text to type" to any element to animate it in. */
function initTypingEffect() {
  const targets = document.querySelectorAll('[data-typing]');
  if (!targets.length) return;

  targets.forEach((el) => {
    const fullText = el.getAttribute('data-typing') || '';
    el.textContent = '';
    let i = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const speed = 28;
        const tick = () => {
          if (i <= fullText.length) {
            el.textContent = fullText.slice(0, i);
            i++;
            setTimeout(tick, speed);
          }
        };
        tick();
      });
    }, { threshold: 0.5 });

    observer.observe(el);
  });
}

/* ---------- Animated particles ---------- */
/* Populates any .particles container with N floating dots. */
function initParticles(count = 24) {
  document.querySelectorAll('.particles').forEach((container) => {
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDuration = `${10 + Math.random() * 12}s`;
      span.style.animationDelay = `-${Math.random() * 20}s`;
      span.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
      container.appendChild(span);
    }
  });
}

/* ---------- Mouse-follow glow ---------- */
function initMouseGlow() {
  const surfaces = document.querySelectorAll('.glow-surface');
  if (!surfaces.length) return;

  surfaces.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${mx}%`);
      el.style.setProperty('--my', `${my}%`);
    });
  });
}

/* ---------- 3D tilt cards ---------- */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  const maxTilt = 8; // degrees

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--ry', `${px * maxTilt * 2}deg`);
      card.style.setProperty('--rx', `${py * -maxTilt * 2}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* ---------- Animated counters ---------- */
/* Add data-count="120" to an element with class="counter" */
function initCounters() {
  const counters = document.querySelectorAll('.counter[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        el.classList.add('is-counting');
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => observer.observe(el));
}
