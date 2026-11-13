const assessmentService = require('./assessment.service');
const asyncHandler = require('../../utils/asyncHandler');
const sendResponse = require('../../utils/responseHandler');

const getAllAssessments = asyncHandler(async (req, res) => {
  const assessments = await assessmentService.getAllAssessments();
  sendResponse(res, 200, true, assessments, 'Assessments retrieved successfully');
});

const getAssessmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const assessment = await assessmentService.getAssessmentById(id);
  sendResponse(res, 200, true, assessment, 'Assessment retrieved successfully');
});

const createAssessment = asyncHandler(async (req, res) => {
  const assessment = await assessmentService.createAssessment(req.body);
  sendResponse(res, 201, true, assessment, 'Assessment created successfully');
});

const submitAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  const result = await assessmentService.submitAssessment({
    userId: req.user.id,
    assessmentId: id,
    answers: answers || {},
  });
  sendResponse(res, 200, true, result, 'Assessment submitted and graded successfully');
});

const getMyResults = asyncHandler(async (req, res) => {
  const results = await assessmentService.getUserResults(req.user.id);
  sendResponse(res, 200, true, results, 'User assessment results retrieved');
});

module.exports = {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  submitAssessment,
  getMyResults,
};
