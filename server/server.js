import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import leadsRouter from './routes/leads.js';
import templatesRouter from './routes/templates.js';
import campaignsRouter from './routes/campaigns.js';
import analyticsRouter from './routes/analytics.js';

const app = express();
const port = process.env.PORT || 5000;

const corsOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/leads', leadsRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/analytics', analyticsRouter);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

