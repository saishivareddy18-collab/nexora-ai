const { GoogleGenAI } = require('@google/genai');

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    'WARNING: GEMINI_API_KEY is not set in environment variables.'
  );
}

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const MODEL_NAME = 'gemini-2.5-flash';

module.exports = {
  genAI,
  MODEL_NAME
};
