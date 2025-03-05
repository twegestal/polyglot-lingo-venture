import { z } from 'zod';

export const quizValidator = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.string().min(2, 'Language must be at least 2 characters'),
  created_at: z.string().optional(),
  questions: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        quiz_id: z.string().uuid().optional(),
        question: z.string().min(5, 'Question must be at least 5 characters'),
        type: z.enum(['single_choice', 'free_text']),
        correct_answer: z.string().min(1, 'Correct answer cannot be empty'),
        options: z.array(z.string()).min(1).optional(),
      }),
    )
    .min(5, 'A quiz must have at least 5 questions'),
});
