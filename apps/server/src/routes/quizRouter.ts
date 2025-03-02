import express, { type Request, type Response, type NextFunction } from 'express';
import { generateQuiz, getAllQuizzes, getQuizById } from '../services/quizService';

export const quizRouter = () => {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const quizzes = await getAllQuizzes();

      return res.status(200).send(quizzes);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Quiz by id called');
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'Quiz id is required' });
      }

      const quiz = await getQuizById(id);

      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      return res.status(200).json(quiz);
    } catch (error) {
      next(error);
    }
  });

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
