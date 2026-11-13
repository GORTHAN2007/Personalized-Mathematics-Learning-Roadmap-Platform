const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  addComment,
  votePost,
} = require('./community.controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', protect, createPost);
router.post('/posts/:id/comments', protect, addComment);
router.post('/posts/:id/vote', protect, votePost);

module.exports = router;
