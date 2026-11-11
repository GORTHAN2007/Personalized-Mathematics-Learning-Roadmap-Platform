const { explainTopic } = require('./ai.service');

async function explain(req, res) {
  const { topic, question, level } = req.body || {};
  if (!topic || !question) {
    return res.status(400).json({ error: 'topic and question are required' });
  }
  try {
    const explanation = await explainTopic({ topic, question, level });
    res.json({ explanation });
  } catch (err) {
    console.error('AI explain error:', err.message);
    res.status(502).json({ error: 'AI service failed, try again' });
  }
}

module.exports = { explain };