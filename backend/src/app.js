const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/ai', require('./modules/ai/ai.routes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running (JavaScript)' });
});

module.exports = app;

