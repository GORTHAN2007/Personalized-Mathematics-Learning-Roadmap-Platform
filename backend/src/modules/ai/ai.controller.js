const { explainTopic, generatePracticeQuestions, suggestRoadmap } = require('./ai.service');

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

module.exports = { explain, practiceQuestions, roadmapSuggestion };

async function roadmapSuggestion(req, res) {
    const { weakTopics, goal } = req.body || {};
    if (!Array.isArray(weakTopics) || weakTopics.length === 0) {
        return res.status(400).json({ error: 'weakTopics must be a non-empty array' });
    }
    if (weakTopics.length > 15) {
        return res.status(400).json({ error: 'weakTopics must contain at most 15 items' });
    }
    if (weakTopics.some((t) => typeof t !== 'string' || t.trim().length === 0)) {
        return res.status(400).json({ error: 'each item in weakTopics must be a non-empty string' });
    }
    try {
        const roadmap = await suggestRoadmap({ weakTopics, goal });
        res.json({ roadmap });
    } catch (err) {
        console.error('AI roadmap error:', err.message);
        res.status(502).json({ error: 'AI service failed, try again' });
    }
}