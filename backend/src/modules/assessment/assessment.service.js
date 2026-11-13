const prisma = require('../../config/db');

class AssessmentService {
  async getAllAssessments() {
    return await prisma.assessment.findMany({
      include: {
        _count: {
          select: { questions: true, results: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAssessmentById(id) {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        questions: {
          select: {
            id: true,
            prompt: true,
            options: true,
            difficulty: true,
            topicId: true,
          },
        },
      },
    });

    if (!assessment) {
      const error = new Error('Assessment not found');
      error.statusCode = 404;
      throw error;
    }

    return assessment;
  }

  async createAssessment({ title, description, questions }) {
    if (!title || !questions || !questions.length) {
      const error = new Error('Title and questions list are required');
      error.statusCode = 400;
      throw error;
    }

    return await prisma.assessment.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((q) => ({
            prompt: q.prompt,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || null,
            difficulty: q.difficulty ? q.difficulty.toUpperCase() : 'BEGINNER',
            topicId: q.topicId || null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });
  }

  async submitAssessment({ userId, assessmentId, answers }) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: { questions: true },
    });

    if (!assessment) {
      const error = new Error('Assessment not found');
      error.statusCode = 404;
      throw error;
    }

    let correctCount = 0;
    const details = [];

    assessment.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const isCorrect =
        userAnswer !== undefined &&
        String(userAnswer).trim().toLowerCase() ===
          String(q.correctAnswer).trim().toLowerCase();

      if (isCorrect) correctCount++;

      details.push({
        questionId: q.id,
        prompt: q.prompt,
        userAnswer: userAnswer || null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const score =
      assessment.questions.length > 0
        ? Math.round((correctCount / assessment.questions.length) * 100)
        : 0;

    const result = await prisma.assessmentResult.create({
      data: {
        userId,
        assessmentId,
        score,
        details,
      },
      include: {
        assessment: {
          select: { id: true, title: true },
        },
      },
    });

    return {
      score,
      totalQuestions: assessment.questions.length,
      correctCount,
      passed: score >= 60,
      resultId: result.id,
      details,
    };
  }

  async getUserResults(userId) {
    return await prisma.assessmentResult.findMany({
      where: { userId },
      include: {
        assessment: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new AssessmentService();
