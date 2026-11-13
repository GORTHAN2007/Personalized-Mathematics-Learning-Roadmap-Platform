const prisma = require('../../config/db');

class RoadmapService {
  async getUserRoadmaps(userId) {
    return await prisma.roadmap.findMany({
      where: { userId },
      include: {
        nodes: {
          include: {
            topic: {
              include: { subject: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getRoadmapById(id, userId) {
    const roadmap = await prisma.roadmap.findFirst({
      where: {
        id,
        OR: [{ userId }, { isPublic: true }],
      },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
        nodes: {
          include: {
            topic: {
              include: { subject: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!roadmap) {
      const error = new Error('Roadmap not found');
      error.statusCode = 404;
      throw error;
    }

    return roadmap;
  }

  async generateRoadmap({ userId, title, subjectId, difficulty }) {
    if (!title || !subjectId) {
      const error = new Error('Title and subjectId are required');
      error.statusCode = 400;
      throw error;
    }

    const where = { subjectId };
    if (difficulty) where.difficulty = difficulty.toUpperCase();

    const topics = await prisma.topic.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
    });

    if (topics.length === 0) {
      const error = new Error('No topics found to generate roadmap');
      error.statusCode = 400;
      throw error;
    }

    const roadmap = await prisma.roadmap.create({
      data: {
        userId,
        title,
        description: `Personalized ${difficulty || 'comprehensive'} roadmap for mathematics learning.`,
        nodes: {
          create: topics.map((topic, index) => ({
            topicId: topic.id,
            status: index === 0 ? 'IN_PROGRESS' : 'LOCKED',
            positionX: 100 + (index % 3) * 200,
            positionY: 100 + Math.floor(index / 3) * 150,
          })),
        },
      },
      include: {
        nodes: {
          include: { topic: true },
        },
      },
    });

    return roadmap;
  }

  async updateNodeStatus(nodeId, userId, status) {
    const node = await prisma.roadmapNode.findUnique({
      where: { id: nodeId },
      include: { roadmap: true },
    });

    if (!node || node.roadmap.userId !== userId) {
      const error = new Error('Node not found or unauthorized');
      error.statusCode = 404;
      throw error;
    }

    const updatedNode = await prisma.roadmapNode.update({
      where: { id: nodeId },
      data: { status: status.toUpperCase() },
      include: { topic: true },
    });

    if (status.toUpperCase() === 'COMPLETED') {
      await prisma.topicProgress.upsert({
        where: {
          userId_topicId: {
            userId,
            topicId: node.topicId,
          },
        },
        update: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
        create: {
          userId,
          topicId: node.topicId,
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });
    }

    return updatedNode;
  }
}

module.exports = new RoadmapService();
