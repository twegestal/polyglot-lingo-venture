import { quizValidator } from '../validators';
import { z } from 'zod';

export type Quiz = z.infer<typeof quizValidator>;
export type Question = z.infer<typeof quizValidator.shape.questions.element>;
