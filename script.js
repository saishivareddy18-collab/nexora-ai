document.addEventListener("DOMContentLoaded", () => {
    const askBtn = document.getElementById("askBtn");
    const promptInput = document.getElementById("userPrompt");
    const outputElement = document.getElementById("outputCode");

    if (askBtn) {
        askBtn.addEventListener("click", async () => {
            const userPrompt = promptInput.value.trim();

            if (!userPrompt) {
                alert("Please enter a question!");
                return;
            }

            outputElement.textContent = "// Nexora AI is generating your response...";

            try {
               document.addEventListener("DOMContentLoaded", () => {
  const askBtn = document.getElementById("askBtn");
  const promptInput = document.getElementById("userPrompt");
  const outputElement = document.getElementById("outputContent");

  if (askBtn) {
    askBtn.addEventListener("click", async () => {
      const userPrompt = promptInput.value.trim();

      if (!userPrompt) {
        alert("Please enter a question!");
        return;
      }

      outputElement.textContent = "// Nexora AI is generating...";

      try {
        // Send request to your Python backend (Replace with your live backend URL)
        const response = await fetch("https://your-backend-url.onrender.com/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: userPrompt
          })
        });

        const data = await response.json();
        outputElement.textContent = data.reply;

      } catch (error) {
        outputElement.textContent = "Error: Unable to connect to backend.";
      }
    });
  }
});
 
                # ❌ DON'T DO THIS (Hardcoding):
# api_key = "sk-proj-xxxxxxxxxxxx"

# ✅ DO THIS INSTEAD (Environment Variable):
import os

api_key = os.environ.get("OPENAI_API_KEY")


                // 2. FETCH REQUEST
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are Nexora AI, an expert coding assistant. Answer: ${userPrompt}`
                            }]
                        }]
                    })
                });

                const data = await response.json();

                if (data.candidates && data.candidates[0].content.parts[0].text) {
                    outputElement.textContent = data.candidates[0].content.parts[0].text;
                    if (window.Prism) {
                        Prism.highlightElement(outputElement);
                    }
                } else if (data.error) {
                    outputElement.textContent = `// Google API Error (${data.error.code}): ${data.error.message}`;
                } else {
                    outputElement.textContent = "// Error: Unexpected response format.";
                }

            } catch (error) {
                // Displays the real browser error on screen
                outputElement.textContent = `// Browser / Network Error: ${error.message}`;
            }
        });
    }
});
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-5.5",
        messages=[
            {
                "role": "system",
                "content": "You are Nexora AI, a professional AI assistant that helps with coding, writing, math, business, translations, and general questions."
            },
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    return {
        "reply": response.choices[0].message.content
    }
<script>
  async function evaluateWithAI(userCode) {
    try {
      const response = await fetch("https://nexora-ai-backend-k2rr.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: `Evaluate this solution for Reverse a String: ${userCode}` })
      });

      const data = await response.json();
      if (data.success) {
        console.log("AI Response:", data.data);
        // Render data.data into your feedback box
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  }
</script>
// Configuration
const API_URL = "https://nexora-ai-backend-k2rr.onrender.com/api/chat";

// DOM Elements
const evaluateBtn = document.getElementById("evaluate-btn"); // Replace with your button ID
const codeInput = document.getElementById("code-input");     // Replace with your code/text area ID
const resultContainer = document.getElementById("result");   // Replace with your output container ID

/**
 * Sends code or user message to Nexora AI backend and returns the evaluation response.
 * @param {string} userMessage - The code string or prompt to send.
 * @returns {Promise<string|null>} The AI response text or null if failed.
 */
async function sendChatMessage(userMessage) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.error("API Error:", data.error || "Failed to process request.");
      return null;
    }
  } catch (error) {
    console.error("Network Error:", error.message);
    return null;
  }
}

/**
 * Handles the click event for evaluating code with Nexora AI.
 */
async function handleEvaluation() {
  const userCode = codeInput ? codeInput.value.trim() : "";

  if (!userCode) {
    alert("Please enter or write your code before submitting!");
    return;
  }

  // Update UI state to loading
  if (evaluateBtn) evaluateBtn.disabled = true;
  if (resultContainer) resultContainer.textContent = "Evaluating code with Nexora AI...";

  // Call API
  const aiResponse = await sendChatMessage(userCode);

  // Update UI with response
  if (resultContainer) {
    if (aiResponse) {
      resultContainer.textContent = aiResponse;
    } else {
      resultContainer.textContent = "An error occurred while evaluating your code. Please try again.";
    }
  }

  // Restore button state
  if (evaluateBtn) evaluateBtn.disabled = false;
}

// Event Listeners
if (evaluateBtn) {
  evaluateBtn.addEventListener("click", handleEvaluation);
}
const API_URL = "https://nexora-ai-backend-k2rr.onrender.com/api/chat";

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

async function handleEvaluation() {
  const btn = document.querySelector(".evaluate-btn") || document.getElementById("evaluate-btn");
  const codeArea = document.querySelector("textarea") || document.getElementById("code-input");
  let outputBox = document.getElementById("evaluation-result");

  // Create output container if it doesn't exist
  if (!outputBox) {
    outputBox = document.createElement("div");
    outputBox.id = "evaluation-result";
    btn.parentNode.appendChild(outputBox);
  }

  const userCode = codeArea ? codeArea.value.trim() : "";

  // Visual loading state with CSS spinner
  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML = `<span class="spinner"></span> Evaluating...`;
  
  outputBox.classList.remove("fade-in"); // Reset animation

  const aiResult = await sendChatMessage(userCode);

  // Restore button state
  btn.disabled = false;
  btn.innerHTML = originalText;

  // Render output with animation
  if (aiResult) {
    outputBox.className = "result-card success fade-in";
    outputBox.innerText = aiResult;
  } else {
    outputBox.className = "result-card error fade-in";
    outputBox.innerText = "⚠️ Failed to evaluate code. Please check your backend or try again.";
  }
}

// Attach listener
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".evaluate-btn") || document.getElementById("evaluate-btn");
  if (btn) btn.addEventListener("click", handleEvaluation);
});
// Ensure this matches your Render backend URL exactly
const API_URL = "https://nexora-ai-backend-k2rr.onrender.com/api/chat";

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
// Live Render Backend Endpoint
const API_URL = "https://nexora-ai-backend-k2rr.onrender.com/api/chat";

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

// Event handler for "Evaluate with Nexora AI" button
async function handleEvaluation() {
  const btn = document.querySelector("button");
  const codeArea = document.querySelector("textarea");
  let outputBox = document.getElementById("evaluation-result");

  // Create an output container if one doesn't exist yet
  if (!outputBox) {
    outputBox = document.createElement("div");
    outputBox.id = "evaluation-result";
    outputBox.style.cssText = "margin-top: 15px; padding: 15px; background: #1a1d24; color: #fff; border-radius: 8px; white-space: pre-wrap;";
    btn.parentNode.appendChild(outputBox);
  }

  // Get problem prompt + user code from text area
  const userCode = codeArea ? codeArea.value.trim() : "";
  const problemTitle = document.querySelector("h2") ? document.querySelector("h2").innerText : "Problem";

  if (!userCode) {
    alert("Please write your solution code first!");
    return;
  }

  // UI Loading State
  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML = "Evaluating with Nexora AI...";
  outputBox.innerText = "Analyzing your code solution...";

  // Combine problem title + code to give full context to Gemini AI
  const promptPayload = `Problem: ${problemTitle}\n\nUser Solution Code:\n${userCode}\n\nPlease evaluate this code for correctness, time complexity, and edge cases.`;

  const aiResult = await sendChatMessage(promptPayload);

  // Restore Button & Show Output
  btn.disabled = false;
  btn.innerHTML = originalText;

  if (aiResult) {
    outputBox.innerText = aiResult;
  } else {
    outputBox.innerText = "⚠️ Failed to evaluate code. Check backend status or try again.";
  }
}

// Attach click listener
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  if (btn) btn.addEventListener("click", handleEvaluation);
});
  if (aiResult) {
    // Renders formatted markdown (bold, lists, code blocks, headers)
    outputBox.innerHTML = typeof marked !== 'undefined' ? marked.parse(aiResult) : aiResult;
  }
