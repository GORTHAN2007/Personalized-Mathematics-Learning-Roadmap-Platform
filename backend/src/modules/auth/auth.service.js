const bcrypt = require('bcryptjs');
const prisma = require('../../config/db');
const { generateToken } = require('../../utils/token');

class AuthService {
  async register({ email, password, name, role = 'STUDENT' }) {
    if (!email || !password || !name) {
      const error = new Error('Please provide email, password, and name');
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      const error = new Error('A user with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        role: role.toUpperCase(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    const token = generateToken(user.id);
    return { user, token };
  }

  async login({ email, password }) {
    if (!email || !password) {
      const error = new Error('Please provide both email and password');
      error.statusCode = 400;
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user.id);

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };

    return { user: safeUser, token };
  }

  async getCurrentUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        _count: {
          select: {
            roadmaps: true,
            progress: true,
            results: true,
          },
        },
      },
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }
}

module.exports = new AuthService();
