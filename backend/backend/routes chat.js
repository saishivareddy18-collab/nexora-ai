const express = require('express');
const router = express.Router();

const { genAI, MODEL_NAME } = require('../config/gemini');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required'
      });
    }

    const response = await genAI.models.generateContent({
      model: MODEL_NAME,
      contents: message
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error('Gemini error:', error);

    res.status(500).json({
      error: 'AI request failed'
    });
  }
});

module.exports = router;
