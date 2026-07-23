alert("Welcome to my website!");document.querySelectorAll("button")[0].onclick = function(){
    alert("Welcome to Nexora AI!");
let buttons = document.querySelectorAll("button");

buttons[0].onclick = function() {
    window.location.href = "login.html";
}

buttons[1].onclick = function() {
    window.location.href = "login.html";
}// Safely handle form submission and avoid duplicate rendering
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const email = document.getElementById("emailInput")?.value;
            const password = document.getElementById("passwordInput")?.value;

            console.log("Logging in with:", { email, password });
            // Add your backend fetch call or logic here safely
        });
    }
});
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexora AI</title>
    <style>
        /* Base Reset */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            background-color: #000000;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            overflow-x: hidden;
        }

        /* --- 1. Login Section (Fixes 6329.jpg) --- */
        .login-card {
            width: 100%;
            max-width: 400px;
            background-color: #00ff7f; /* Green background */
            padding: 40px 20px;
            border-radius: 15px;
            text-align: center;
            margin-bottom: 60px;
        }
        .login-card h2 {
            color: #000;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }
        .login-card input {
            width: 100%;
            padding: 14px;
            margin-bottom: 15px;
            border-radius: 8px;
            border: none;
            outline: none;
            font-size: 1rem;
        }
        .btn-login {
            width: 100%;
            padding: 14px;
            background-color: #000;
            color: #00ff7f;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
        }

        /* --- 2. Features Section (Fixes 6325.jpg) --- */
        .features-section {
            width: 100%;
            max-width: 500px;
            text-align: center;
            margin-bottom: 60px;
        }
        .features-section h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .features-list {
            display: flex;
            flex-direction: column; /* Forces items to stack vertically */
            gap: 15px;
        }
        .feature-item {
            display: flex;
            align-items: center;
            gap: 15px;
            background: #111;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 1.1rem;
            text-align: left;
        }
        .check-icon {
            background-color: #00ff7f;
            color: #000;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
        }

        /* --- 3. Footer Section (Fixes 6327.jpg) --- */
        .footer-section {
            width: 100%;
            text-align: center;
            border-top: 1px solid #333;
            padding-top: 20px;
            display: flex;
            flex-direction: column; /* Stacks contact info vertically */
            gap: 10px;
        }
        .footer-section p {
            color: #ccc;
            font-size: 1rem;
        }
        .copyright {
            color: #777 !important;
            font-size: 0.9rem !important;
            margin-top: 10px;
        }
    </style>
</head>
<body>

    <!-- LOGIN AREA -->
    <div class="login-card">
        <h2>Nexora AI</h2>
        <form id="loginForm">
            <input type="email" placeholder="Enter Email" required>
            <input type="password" placeholder="Enter Password" required>
            <button type="submit" class="btn-login" id="myBtn">Login</button>
        </form>
    </div>

    <!-- FEATURES AREA -->
    <div class="features-section">
        <h2>Why Choose Nexora AI?</h2>
        <div class="features-list">
            <div class="feature-item"><span class="check-icon">✓</span> Learn with AI Tutor</div>
            <div class="feature-item"><span class="check-icon">✓</span> Solve DSA Step by Step</div>
            <div class="feature-item"><span class="check-icon">✓</span> Practice Coding Daily</div>
            <div class="feature-item"><span class="check-icon">✓</span> Track Your Progress</div>
        </div>
    </div>

    <!-- FOOTER AREA -->
    <div class="footer-section">
        <p><strong>Contact</strong></p>
        <p>Email: support@nexoraai.com</p>
        <p>Instagram: @nexora_ai</p>
        <p class="copyright">© 2026 Nexora AI. All Rights Reserved</p>
    </div>

    <!-- JAVASCRIPT FIXED (Moved to bottom, inside proper tags) -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const btn = document.getElementById("myBtn");
            if (btn) {
                btn.onclick = function(event) {
                    event.preventDefault();
                    console.log("Login clicked cleanly.");
                    // Your login code goes here
                };
            }
        });
    </script>

</body>
</html>
.login-card, input {
  width: 90%;       /* Takes up 90% of screen width */
  max-width: 400px; /* Keeps it clean on larger screens */
  box-sizing: border-box;
}
/* Container holding your items (e.g., feature cards, footer info) */
.container {
  display: flex;
  flex-direction: column; /* Stacks items vertically */
  align-items: center;    /* Centers content horizontally */
  width: 100%;
}

/* Ensure child elements don't exceed screen width */
.card, .section {
  width: 100%;
  max-width: 400px; /* Optional max constraint */
  margin: 10px 0;
}async function askNexora() {
    const promptInput = document.getElementById("userPrompt");
    const outputElement = document.getElementById("outputCode");
    const userPrompt = promptInput.value.trim();
    
    if (!userPrompt) {
        alert("Please enter a question!");
        return;
    }

    outputElement.textContent = "// Nexora AI is generating your response...";

    try {
        // Replace with your actual key from Google AI Studio
        const apiKey = "YOUR_GEMINI_API_KEY_HERE"; 
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `You are Nexora AI, an expert coding and DSA assistant. Provide a concise explanation with clean code for this prompt: ${userPrompt}` 
                    }] 
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiReply = data.candidates[0].content.parts[0].text;
            outputElement.textContent = aiReply;
            
            if (window.Prism) {
                Prism.highlightElement(outputElement);
            }
        } else {
            outputElement.textContent = "// Error: Could not retrieve response from AI.";
        }

    } catch (error) {
        outputElement.textContent = "// Error connecting to AI assistant. Check network or API key.";
        console.error("API Error:", error);
    }
}

// Put this inside script.js (NOT index.html)
const btn = document.getElementById("myBtn");
if (btn) {
  btn.onclick = function () {
    // your code here
  };
}
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("myButton");
  if (btn) {
    btn.onclick = function () {
      // Add your action code here
    };
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".btn-login");
  
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevents page reload
      
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      if (!email || !password) {
        alert("Please enter both email and password!");
        return;
      }

      console.log("Logging in with:", email);
      // Here you can connect to your backend API or Firebase authentication
    });
  }
});
