require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

let client;
function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing in backend/.env');
  }
  if (!client) {
    client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { apiVersion: 'v1beta' },
    });
  }
  return client;
}

// Sends a prompt to Gemini and returns the text reply.
// Pass { json: true } when you want a JSON-only response.
async function askGemini(prompt, { json = false } = {}) {
  const response = await getClient().models.generateContent({
    model: MODEL,
    contents: prompt,
    config: json ? { responseMimeType: 'application/json' } : undefined,
  });
  return response.text;
}

module.exports = { askGemini };