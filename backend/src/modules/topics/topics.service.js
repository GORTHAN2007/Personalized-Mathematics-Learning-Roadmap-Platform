const prisma = require('../../config/db');

class TopicsService {
  async getAllTopics(filters = {}) {
    const where = {};
    if (filters.subjectId) where.subjectId = filters.subjectId;
    if (filters.difficulty) where.difficulty = filters.difficulty.toUpperCase();

    return await prisma.topic.findMany({
      where,
      include: {
        subject: {
          select: { id: true, title: true, slug: true },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async getTopicBySlug(slug) {
    const topic = await prisma.topic.findUnique({
      where: { slug },
      include: {
        subject: true,
        questions: {
          select: {
            id: true,
            prompt: true,
            difficulty: true,
          },
        },
      },
    });

    if (!topic) {
      const error = new Error(`Topic not found with slug: ${slug}`);
      error.statusCode = 404;
      throw error;
    }

    return topic;
  }

  async createTopic(data) {
    const { subjectId, title, slug, description, difficulty, orderIndex } = data;
    if (!subjectId || !title || !slug) {
      const error = new Error('subjectId, title, and slug are required');
      error.statusCode = 400;
      throw error;
    }

    return await prisma.topic.create({
      data: {
        subjectId,
        title,
        slug,
        description,
        difficulty: difficulty ? difficulty.toUpperCase() : 'BEGINNER',
        orderIndex: orderIndex || 0,
      },
    });
  }
}

module.exports = new TopicsService();
