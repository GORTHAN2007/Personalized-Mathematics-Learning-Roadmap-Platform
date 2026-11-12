const { explainTopic, generatePracticeQuestions } = require('./ai.service');

async function practiceQuestions(req, res) {
    const { topic, difficulty, count } = req.body || {};
    if (!topic) {
        return res.status(400).json({ error: 'topic is required' });
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

module.exports = { explain, practiceQuestions };