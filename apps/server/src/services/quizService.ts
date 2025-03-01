import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { Quiz, QuizSchema } from 'api';
import { quizRepository } from '../repositories/quizRepository';
import { getQuizPropmt } from '../utils/promptUtils';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuiz = async (language: string, difficulty: string) => {
  const prompt = getQuizPropmt(language, difficulty);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    if (!response.choices[0].message?.content) {
      throw new Error('No response from OpenAI.');
    }

    const rawQuizData = JSON.parse(response.choices[0].message.content);

    const parsedQuiz = QuizSchema.safeParse(rawQuizData);

    if (!parsedQuiz.success) {
      console.error('OpenAI response validation failed:', parsedQuiz.error.format());
      throw new Error('Invalid quiz format returned by OpenAI.');
    }

    const validatedQuiz: Quiz = parsedQuiz.data;

    const quizId = await quizRepository.saveQuiz(
      validatedQuiz.title,
      validatedQuiz.description,
      validatedQuiz.difficulty,
      validatedQuiz.language,
      validatedQuiz.questions,
    );

    return { id: quizId, ...validatedQuiz };
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz.');
  }
};
