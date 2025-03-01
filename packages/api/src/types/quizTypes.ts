import { QuizSchema } from '../validators';
import { z } from 'zod';

export type Quiz = z.infer<typeof QuizSchema>;
export type Question = z.infer<typeof QuizSchema.shape.questions.element>;
