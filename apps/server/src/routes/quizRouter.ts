import express, { Request, Response, NextFunction } from 'express';
import {
  generateQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuizResult,
} from '../services/quizService';
import { logger } from '../utils/logger';

export const quizRouter = () => {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const user = (req as any).user;

      if (!user?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const quizzes = await getAllQuizzes(user.id);
      return res.status(200).send(quizzes);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      logger.info(`Fetching quiz: ${id}`);

      if (!id) {
        return res.status(400).json({ message: 'Quiz id is required' });
      }

      const quiz = await getQuizById(id);

      if (!quiz) {
        logger.warn(`Quiz not found: ${id}`);
        return res.status(404).json({ message: 'Quiz not found' });
      }

      logger.info(`Successfully fetched quiz: ${quiz.id}`);
      return res.status(200).json(quiz);
    } catch (error) {
      logger.error(`Error fetching quiz: ${error}`);
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { language, difficulty } = req.body;

      logger.info(
        `Received quiz generation request: Language=${language}, Difficulty=${difficulty}`,
      );

      if (!language || !difficulty) {
        logger.warn('Invalid request: Missing language or difficulty');
        return res.status(400).json({ error: 'Both language and difficulty are required' });
      }

      const quiz = await generateQuiz(language, difficulty);
      logger.info(`Quiz generated successfully: ID=${quiz.id}, Title="${quiz.title}"`);
      return res.status(201).json(quiz);
    } catch (error) {
      logger.error(`Error generating quiz: ${error}`);
      next(error);
    }
  });

  router.post('/:id/result', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const quizId = req.params.id;
      const { score, maxScore, status } = req.body;
      const user = (req as any).user;

      if (!user?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (
        !quizId ||
        typeof score !== 'number' ||
        typeof maxScore !== 'number' ||
        !['success', 'fail', 'neutral'].includes(status)
      ) {
        return res.status(400).json({ message: 'Missing or invalid result data' });
      }

      const result = await submitQuizResult(user.id, quizId, score, maxScore, status);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
