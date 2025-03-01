import express from 'express';
import { healthRouter } from './routes/healthRouter';
import { quizRouter } from './routes/quizRouter';

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/health', healthRouter());
  app.use('/quizzes', quizRouter());

  return app;
};
