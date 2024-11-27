import express from 'express';

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.get('/health', async (_req, res, _next) => {
    res.status(200).json('Hello, World');
  });

  return app;
};
