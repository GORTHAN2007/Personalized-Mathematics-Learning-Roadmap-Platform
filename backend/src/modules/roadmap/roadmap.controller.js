const roadmapService = require('./roadmap.service');
const asyncHandler = require('../../utils/asyncHandler');
const sendResponse = require('../../utils/responseHandler');

const getMyRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await roadmapService.getUserRoadmaps(req.user.id);
  sendResponse(res, 200, true, roadmaps, 'User roadmaps retrieved successfully');
});

const getRoadmapById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const roadmap = await roadmapService.getRoadmapById(id, req.user.id);
  sendResponse(res, 200, true, roadmap, 'Roadmap retrieved successfully');
});

const generateRoadmap = asyncHandler(async (req, res) => {
  const { title, subjectId, difficulty } = req.body;
  const roadmap = await roadmapService.generateRoadmap({
    userId: req.user.id,
    title,
    subjectId,
    difficulty,
  });
  sendResponse(res, 201, true, roadmap, 'Roadmap generated successfully');
});

const updateNodeStatus = asyncHandler(async (req, res) => {
  const { nodeId } = req.params;
  const { status } = req.body;
  const node = await roadmapService.updateNodeStatus(nodeId, req.user.id, status);
  sendResponse(res, 200, true, node, 'Node status updated successfully');
});

module.exports = {
  getMyRoadmaps,
  getRoadmapById,
  generateRoadmap,
  updateNodeStatus,
};
