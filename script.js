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
                // ⚠️ PASTE YOUR ACTUAL API KEY HERE ⚠️
                const apiKey = curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AQ.Ab8RN6Kcgn0B3OKowZNpzvv7EOB8eHgkAr6D8oP727EtIYNJTA' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }' 

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are Nexora AI, an expert developer assistant. Answer this query clearly with code: ${userPrompt}`
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
                    outputElement.textContent = `// API Error: ${data.error.message}`;
                } else {
                    outputElement.textContent = "// Error: Unexpected response format.";
                }

            } catch (error) {
                outputElement.textContent = "// Connection Error: Check internet connection or API Key.";
                console.error("API Fetch Error:", error);
            }
        });
    }
});
