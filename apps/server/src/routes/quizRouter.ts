import express, { type Request, type Response, type NextFunction } from 'express';
import { generateQuiz } from '../services/quizService';

export const quizRouter = () => {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    const quizzes: never[] = [];

    return res.status(200).json(quizzes);
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {});

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { language, difficulty } = req.body;

      if (!language || !difficulty) {
        return res.status(400).json({ error: 'Both language and difficulty are required' });
      }

      const quiz = await generateQuiz(language, difficulty);
      return res.status(201).json(quiz);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
