const express = require('express');
const { protect } = require('../../middleware/auth');
const prisma = require('../../config/db');
const { successResponse, errorResponse } = require('../../utils/responseHandler');

const router = express.Router();

// GET all notes for logged-in user
router.get('/', protect, async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' }
    });
    return successResponse(res, notes, 'Notes retrieved successfully');
  } catch (err) {
    next(err);
  }
});

// POST create note
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;
    if (!title) {
      return errorResponse(res, 'Title is required', 400);
    }
    const note = await prisma.note.create({
      data: {
        userId: req.user.id,
        title,
        content: content || '',
        tag: tag || 'General'
      }
    });
    return successResponse(res, note, 'Note created', 201);
  } catch (err) {
    next(err);
  }
});

// PUT update note
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tag } = req.body;

    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user.id) {
      return errorResponse(res, 'Note not found or unauthorized', 404);
    }

    const updated = await prisma.note.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(tag !== undefined && { tag })
      }
    });
    return successResponse(res, updated, 'Note updated');
  } catch (err) {
    next(err);
  }
});

// DELETE note
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user.id) {
      return errorResponse(res, 'Note not found or unauthorized', 404);
    }

    await prisma.note.delete({ where: { id } });
    return successResponse(res, null, 'Note deleted');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
