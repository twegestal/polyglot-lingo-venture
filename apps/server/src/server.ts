import express from 'express';
import { healthRouter } from './routes/healthRouter';
import { quizRouter } from './routes/quizRouter';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/loggerMIddleware';
import { authHandler } from './middleware/authMiddleware';

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);
  app.use('/health', healthRouter());
  app.use('/quizzes', authHandler, quizRouter());
  app.use(errorHandler);

  return app;
};
