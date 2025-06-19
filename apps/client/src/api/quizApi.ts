import { Quiz, quizMetadataValidator, quizValidator } from 'api';
import ky from 'ky';
import { z } from 'zod';
import { CreateQuizResponse } from '../types/apiResponse';

const prefixUrl = 'quizzes/';

export const quizApi = (apiClient: typeof ky) => ({
  getAllQuizzes: async () => {
    const response: Quiz[] = await apiClient.get(`${prefixUrl}`).json();
    return z.array(quizMetadataValidator).parse(response);
  },

  getQuizById: async ({ id }: { id: string }) => {
    const response: Quiz = await apiClient.get(`${prefixUrl}/${id}`).json();
    return quizValidator.parse(response);
  },

  submitQuizResult: async ({
    id,
    score,
    maxScore,
    isPassed,
  }: {
    id: string;
    score: number;
    maxScore: number;
    isPassed: boolean;
  }) => {
    const status = isPassed ? 'success' : 'fail';

    await apiClient.post(`quizzes/${id}/result`, {
      json: { score, maxScore, status },
    });
  },

  createQuiz: async ({
    language,
    difficulty,
  }: {
    language: string;
    difficulty: string;
  }): Promise<CreateQuizResponse> => {
    const response = await apiClient.post('quizzes', {
      json: { language, difficulty },
    });

    return response.json<CreateQuizResponse>();
  },
});
