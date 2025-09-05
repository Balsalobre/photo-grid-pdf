import express from 'express';
import cors from 'cors';
import { photoGridRoutes } from './routes/photoGridRoutes';
import { errorHandler } from './middleware/errorHandler';

export function createServer() {
  const app = express();
  app.use(cors());

  // health
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // routes
  app.use('/', photoGridRoutes);

  // error handler
  app.use(errorHandler);
  return app;
}
