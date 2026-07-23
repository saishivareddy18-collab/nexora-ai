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
                // 1. YOUR API KEY
                const apiKey = "YOUR_GEMINI_API_KEY_HERE"; 

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
