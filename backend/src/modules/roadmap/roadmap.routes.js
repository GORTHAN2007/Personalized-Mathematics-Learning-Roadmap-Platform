const express = require('express');
const {
  getMyRoadmaps,
  getRoadmapById,
  generateRoadmap,
  updateNodeStatus,
} = require('./roadmap.controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.get('/my-roadmaps', protect, getMyRoadmaps);
router.get('/:id', protect, getRoadmapById);
router.post('/generate', protect, generateRoadmap);
router.patch('/nodes/:nodeId/status', protect, updateNodeStatus);

module.exports = router;
