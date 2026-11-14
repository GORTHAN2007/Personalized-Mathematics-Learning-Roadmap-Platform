const BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/v1` 
  : 'http://localhost:5001/api/v1';

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
  return data;
}

export const explainTopic = (topic, question, level) =>
  post('/ai/explain', { topic, question, level });

export const getPracticeQuestions = (topic, difficulty = 'easy', count = 5) =>
  post('/ai/practice-questions', { topic, difficulty, count });