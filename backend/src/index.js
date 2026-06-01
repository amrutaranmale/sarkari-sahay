import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import schemesRouter from './routes/schemes.js';
import eligibilityRouter from './routes/eligibility.js';
import statsRouter from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'SarkariSahay API' });
});

app.use('/api/schemes', schemesRouter);
app.use('/api/eligibility', eligibilityRouter);
app.use('/api/stats', statsRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`SarkariSahay API running on http://localhost:${PORT}`);
});
