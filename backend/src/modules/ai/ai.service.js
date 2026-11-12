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
function validateQuestions(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('AI returned no questions');
  }
  return data.map((q) => {
    const ok =
      typeof q.question === 'string' &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.options.every((o) => typeof o === 'string') &&
      Number.isInteger(q.correctIndex) &&
      q.correctIndex >= 0 &&
      q.correctIndex <= 3 &&
      typeof q.explanation === 'string';
    if (!ok) throw new Error('AI returned a malformed question');
    return {
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    };
  });
}

async function generatePracticeQuestions({ topic, difficulty = 'easy', count = 5 }) {
  const n = Math.min(Math.max(parseInt(count, 10) || 5, 1), 10);
  const prompt = `Create ${n} multiple choice math practice questions on "${topic}" at ${difficulty} difficulty.
Return ONLY a JSON array. Each item must look exactly like this:
{"question": "text", "options": ["a","b","c","d"], "correctIndex": 0, "explanation": "text"}
correctIndex is a number from 0 to 3. No markdown, no extra text.`;
  const raw = await askGemini(prompt, { json: true });
  return validateQuestions(JSON.parse(raw));
}

module.exports = { explainTopic, generatePracticeQuestions };
