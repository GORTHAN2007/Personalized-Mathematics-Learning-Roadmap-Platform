const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const aiRoutes = require('./modules/ai/ai.routes');
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

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
