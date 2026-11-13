const communityService = require('./community.service');
const asyncHandler = require('../../utils/asyncHandler');
const sendResponse = require('../../utils/responseHandler');

const getAllPosts = asyncHandler(async (req, res) => {
  const result = await communityService.getAllPosts(req.query);
  sendResponse(res, 200, true, result, 'Community posts retrieved successfully');
});

const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await communityService.getPostById(id);
  sendResponse(res, 200, true, post, 'Post retrieved successfully');
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const post = await communityService.createPost({
    userId: req.user.id,
    title,
    content,
    tags,
  });
  sendResponse(res, 201, true, post, 'Post created successfully');
});

const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comment = await communityService.addComment({
    userId: req.user.id,
    postId: id,
    content,
  });
  sendResponse(res, 201, true, comment, 'Comment added successfully');
});

const votePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const vote = await communityService.votePost({
    userId: req.user.id,
    postId: id,
    value,
  });
  sendResponse(res, 200, true, vote, 'Vote recorded successfully');
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  addComment,
  votePost,
};
