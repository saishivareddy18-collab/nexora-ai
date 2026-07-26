import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Nexora AI Backend is Running",
    version: "1.0.0"
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime()
  });
});

// AI Chat Route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    res.json({
      success: true,
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to generate AI response"
    });
  }
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Nexora AI Server running on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Home Route
app.get("/", (req, res) => {
  res.send("Nexora AI Backend is Running!");
});

// 👇 PASTE YOUR app.post("/api/chat", ...) CODE HERE

app.post("/api/chat", async (req, res) => {
  // Your code here
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
