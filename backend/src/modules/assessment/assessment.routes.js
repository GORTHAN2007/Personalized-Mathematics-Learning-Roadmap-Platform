const express = require('express');
const {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  submitAssessment,
  getMyResults,
} = require('./assessment.controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.get('/', getAllAssessments);
router.get('/my-results', protect, getMyResults);
router.get('/:id', getAssessmentById);
router.post('/', protect, createAssessment);
router.post('/:id/submit', protect, submitAssessment);

module.exports = router;
