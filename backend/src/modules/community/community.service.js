const prisma = require('../../config/db');

class CommunityService {
  async getAllPosts({ tag, search, page = 1, limit = 10 }) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    if (tag) {
      where.tags = { has: tag.toLowerCase() };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true },
          },
          _count: {
            select: { comments: true, votes: true },
          },
          votes: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.count({ where }),
    ]);

    const formattedPosts = posts.map((post) => {
      const upvotes = post.votes.filter((v) => v.value === 1).length;
      const downvotes = post.votes.filter((v) => v.value === -1).length;
      const { votes, ...rest } = post;
      return {
        ...rest,
        score: upvotes - downvotes,
        upvotes,
        downvotes,
      };
    });

    return {
      posts: formattedPosts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async getPostById(id) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
        comments: {
          include: {
            user: {
              select: { id: true, name: true, avatarUrl: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        votes: true,
      },
    });

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    const upvotes = post.votes.filter((v) => v.value === 1).length;
    const downvotes = post.votes.filter((v) => v.value === -1).length;
    const { votes, ...rest } = post;

    return {
      ...rest,
      score: upvotes - downvotes,
      upvotes,
      downvotes,
    };
  }

  async createPost({ userId, title, content, tags = [] }) {
    if (!title || !content) {
      const error = new Error('Title and content are required');
      error.statusCode = 400;
      throw error;
    }

    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim().toLowerCase())
      : [];

    return await prisma.post.create({
      data: {
        userId,
        title,
        content,
        tags: normalizedTags,
      },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
    });
  }

  async addComment({ userId, postId, content }) {
    if (!content) {
      const error = new Error('Comment content is required');
      error.statusCode = 400;
      throw error;
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.comment.create({
      data: {
        userId,
        postId,
        content,
      },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
    });
  }

  async votePost({ userId, postId, value }) {
    const numericValue = parseInt(value);
    if (![1, -1, 0].includes(numericValue)) {
      const error = new Error('Vote value must be 1 (upvote), -1 (downvote), or 0 (remove vote)');
      error.statusCode = 400;
      throw error;
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    if (numericValue === 0) {
      await prisma.vote.deleteMany({
        where: { postId, userId },
      });
      return { message: 'Vote removed', value: 0 };
    }

    const vote = await prisma.vote.upsert({
      where: {
        postId_userId: { postId, userId },
      },
      update: { value: numericValue },
      create: { postId, userId, value: numericValue },
    });

    return vote;
  }
}

module.exports = new CommunityService();
