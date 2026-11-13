const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const aiRoutes = require('./modules/ai/ai.routes');
const subjectsRoutes = require('./modules/subjects/subjects.routes');
const topicsRoutes = require('./modules/topics/topics.routes');
const roadmapRoutes = require('./modules/roadmap/roadmap.routes');
const assessmentRoutes = require('./modules/assessment/assessment.routes');
const communityRoutes = require('./modules/community/community.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Base Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'MathPath AI Backend is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Feature Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/subjects', subjectsRoutes);
app.use('/api/v1/topics', topicsRoutes);
app.use('/api/v1/roadmap', roadmapRoutes);
app.use('/api/v1/assessment', assessmentRoutes);
app.use('/api/v1/community', communityRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
