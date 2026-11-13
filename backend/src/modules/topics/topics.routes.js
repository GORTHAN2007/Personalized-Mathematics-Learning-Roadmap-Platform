const express = require('express');
const {
  getAllTopics,
  getTopicBySlug,
  createTopic,
} = require('./topics.controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.get('/', getAllTopics);
router.get('/:slug', getTopicBySlug);
router.post('/', protect, createTopic);

module.exports = router;
