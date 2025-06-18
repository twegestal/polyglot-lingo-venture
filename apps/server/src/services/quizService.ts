import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { Quiz, QuizMetadata, quizValidator } from 'api';
import { quizRepository } from '../repositories/quizRepository';
import { getQuizPrompt } from '../utils/promptUtils';
import { cleanResponse } from '../utils/responseUtils';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAllQuizzes = async (userId: string): Promise<QuizMetadata[]> => {
  return await quizRepository.getAllQuizzes(userId);
};

export const getQuizById = async (id: string): Promise<Quiz | null> => {
  return await quizRepository.getQuizById(id);
};

export const generateQuiz = async (language: string, difficulty: string) => {
  const prompt = getQuizPrompt(language, difficulty);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    const content = response.choices[0].message?.content;
    if (!content) {
      throw new Error('No response from OpenAI.');
    }

    const cleanedContent = cleanResponse(content);

    let rawQuizData;
    try {
      rawQuizData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse cleaned OpenAI response');
      console.error('Original content:', content);
      console.error('Cleaned content:', cleanedContent);
      throw new Error('Malformed JSON returned by OpenAI.');
    }

    const parsedQuiz = quizValidator.safeParse(rawQuizData);

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

export const submitQuizResult = async (
  userId: string,
  quizId: string,
  score: number,
  maxScore: number,
  status: 'success' | 'fail' | 'neutral',
) => {
  return await quizRepository.submitQuizResult(userId, quizId, score, maxScore, status);
};

export const getQuizStats = async (userId: string) => {
  return await quizRepository.getQuizStats(userId);
};
