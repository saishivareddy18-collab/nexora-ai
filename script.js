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

            outputElement.textContfent = "// Nexora AI is thinking...";

            try {

                const apiKey = AQ.Ab8RN6K6n8SiU4yvwIkV5QPslXWQbPqs4TV1jdYeHHiTKrlrSg

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {

                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are Nexora AI, a helpful coding assistant. Answer this query concisely with clean code: ${userPrompt}`
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
                    outputElement.textContent = "// Error: Unexpected response format from AI.";
                }

            } catch (error) {
                outputElement.textContent = "// Connection error. Please check your internet or API key.";
                console.error("API Error:", error);
            }
        });
    }
});
