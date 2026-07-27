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
