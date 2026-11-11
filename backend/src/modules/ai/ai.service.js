const { askGemini } = require('./gemini');

async function explainTopic({ topic, question, level = 'beginner' }) {
  const prompt = `You are a friendly mathematics tutor.
Topic: ${topic}
Student level: ${level}
Student question: ${question}

Explain clearly in simple language with one small worked example.
Keep it under 250 words. Plain text only: no markdown, no asterisks, no greeting.`;;
  return askGemini(prompt);
}

module.exports = { explainTopic };