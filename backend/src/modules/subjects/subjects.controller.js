const subjectsService = require('./subjects.service');
const asyncHandler = require('../../utils/asyncHandler');
const sendResponse = require('../../utils/responseHandler');

const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await subjectsService.getAllSubjects();
  sendResponse(res, 200, true, subjects, 'Subjects retrieved successfully');
});

const getSubjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const subject = await subjectsService.getSubjectBySlug(slug);
  sendResponse(res, 200, true, subject, 'Subject retrieved successfully');
});

const createSubject = asyncHandler(async (req, res) => {
  const subject = await subjectsService.createSubject(req.body);
  sendResponse(res, 201, true, subject, 'Subject created successfully');
});

module.exports = {
  getAllSubjects,
  getSubjectBySlug,
  createSubject,
};
