const API_URL = "https://nexora-ai-backend-k2rr.onrender.com/api/chat";

// Helper function to handle API calls
async function sendChatMessage(userMessage) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    return data.success ? data.data : null;
  } catch (error) {
    console.error("Network Error:", error.message);
    return null;
  }
}

// Handler for the "Ask AI" button inside DSA Assistant
async function handleAskAI() {
  // Select input textarea, button, and output box inside DSA Assistant
  const inputField = document.querySelector("textarea") || document.getElementById("ai-input");
  const askBtn = document.querySelector(".ask-ai-btn") || document.getElementById("ask-ai-btn") || Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("Ask AI"));
  const outputBox = document.querySelector(".output-box") || document.getElementById("ai-output") || document.querySelector("div:has(> p)");

  const userQuery = inputField ? inputField.value.trim() : "";

  if (!userQuery) {
    alert("Please type a question or code snippet first!");
    return;
  }

  // Update UI to Loading State
  if (askBtn) askBtn.disabled = true;
  const originalBtnText = askBtn ? askBtn.innerHTML : "Ask AI";
  if (askBtn) askBtn.innerHTML = "Thinking...";

  // Target the text container inside Output box
  const targetOutput = outputBox ? outputBox : document.querySelector("pre") || document.body;
  targetOutput.innerText = "Generating answer with Nexora AI...";

  // Call Backend API
  const aiResult = await sendChatMessage(userQuery);

  // Restore Button State
  if (askBtn) {
    askBtn.disabled = false;
    askBtn.innerHTML = originalBtnText;
  }

  // Render Response
  if (aiResult) {
    // If Marked.js is included in index.html, format as Markdown; otherwise display text
    if (typeof marked !== "undefined") {
      targetOutput.innerHTML = marked.parse(aiResult);
    } else {
      targetOutput.innerText = aiResult;
    }
  } else {
    targetOutput.innerText = "⚠️ Server took too long or failed to respond. Please try again.";
  }
}

// Attach Event Listeners on Load
document.addEventListener("DOMContentLoaded", () => {
  // Find "Ask AI" button and bind click event
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    if (btn.innerText.includes("Ask AI")) {
      btn.addEventListener("click", handleAskAI);
    }
  });
});
