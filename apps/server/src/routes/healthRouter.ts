import express from 'express';

export const healthRouter = () => {
  const router = express.Router();

  router.get('/', async (_req, res, _next) => {
    res.status(200).json('Hello, World');
  });

  return router;
};
