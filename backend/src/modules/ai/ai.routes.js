const express = require('express');
const { explain } = require('./ai.controller');

const router = express.Router();
router.post('/explain', explain);

module.exports = router;