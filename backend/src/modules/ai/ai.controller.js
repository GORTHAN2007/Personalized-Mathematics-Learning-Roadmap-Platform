const { explainTopic, generatePracticeQuestions } = require('./ai.service');

async function practiceQuestions(req, res) {
    const { topic, difficulty, count } = req.body || {};
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
        return res.status(400).json({ error: 'topic is required' });
    }
    if (topic.length > 100) {
        return res.status(400).json({ error: 'topic must be at most 100 characters' });
    }
    if (difficulty !== undefined && !['easy', 'medium', 'hard'].includes(difficulty)) {
        return res.status(400).json({ error: 'difficulty must be easy, medium, or hard' });
    }
    try {
        const questions = await generatePracticeQuestions({ topic, difficulty, count });
        res.json({ questions });
    } catch (err) {
        console.error('AI practice error:', err.message);
        res.status(502).json({ error: 'AI service failed, try again' });
    }
}
async function explain(req, res) {
    const { topic, question, level } = req.body || {};
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
        return res.status(400).json({ error: 'topic and question are required' });
    }
    if (topic.length > 100) {
        return res.status(400).json({ error: 'topic must be at most 100 characters' });
    }
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
        return res.status(400).json({ error: 'topic and question are required' });
    }
    if (question.length > 500) {
        return res.status(400).json({ error: 'question must be at most 500 characters' });
    }
    try {
        const explanation = await explainTopic({ topic, question, level });
        res.json({ explanation });
    } catch (err) {
        console.error('AI explain error:', err.message);
        res.status(502).json({ error: 'AI service failed, try again' });
    }
}

module.exports = { explain, practiceQuestions };