const topicsService = require('./topics.service');
const asyncHandler = require('../../utils/asyncHandler');
const sendResponse = require('../../utils/responseHandler');

const getAllTopics = asyncHandler(async (req, res) => {
  const topics = await topicsService.getAllTopics(req.query);
  sendResponse(res, 200, true, topics, 'Topics retrieved successfully');
});

const getTopicBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const topic = await topicsService.getTopicBySlug(slug);
  sendResponse(res, 200, true, topic, 'Topic retrieved successfully');
});

const createTopic = asyncHandler(async (req, res) => {
  const topic = await topicsService.createTopic(req.body);
  sendResponse(res, 201, true, topic, 'Topic created successfully');
});

module.exports = {
  getAllTopics,
  getTopicBySlug,
  createTopic,
};
