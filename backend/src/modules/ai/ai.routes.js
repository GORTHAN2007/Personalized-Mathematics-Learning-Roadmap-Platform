const express = require('express');
const { explain, practiceQuestions, roadmapSuggestion } = require('./ai.controller');

const router = express.Router();
router.post('/explain', explain);
router.post('/practice-questions', practiceQuestions);
router.post('/suggest-roadmap', roadmapSuggestion);

module.exports = router;