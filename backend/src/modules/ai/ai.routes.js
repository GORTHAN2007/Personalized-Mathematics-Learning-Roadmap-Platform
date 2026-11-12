const express = require('express');
const { explain, practiceQuestions } = require('./ai.controller');

const router = express.Router();
router.post('/explain', explain);
router.post('/practice-questions', practiceQuestions);

module.exports = router;