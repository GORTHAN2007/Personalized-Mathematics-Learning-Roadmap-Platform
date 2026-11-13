const express = require('express');
const {
  getAllSubjects,
  getSubjectBySlug,
  createSubject,
} = require('./subjects.controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:slug', getSubjectBySlug);
router.post('/', protect, createSubject);

module.exports = router;
