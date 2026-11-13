const prisma = require('../../config/db');

class SubjectsService {
  async getAllSubjects() {
    return await prisma.subject.findMany({
      include: {
        _count: {
          select: { topics: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getSubjectBySlug(slug) {
    const subject = await prisma.subject.findUnique({
      where: { slug },
      include: {
        topics: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!subject) {
      const error = new Error(`Subject not found with slug: ${slug}`);
      error.statusCode = 404;
      throw error;
    }

    return subject;
  }

  async createSubject(data) {
    const { title, slug, description, icon } = data;
    if (!title || !slug) {
      const error = new Error('Title and slug are required');
      error.statusCode = 400;
      throw error;
    }

    return await prisma.subject.create({
      data: { title, slug, description, icon },
    });
  }
}

module.exports = new SubjectsService();
