import { Quiz, quizMetadataValidator, quizValidator } from 'api';
import ky from 'ky';
import { z } from 'zod';

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
    await apiClient.post(`quizzes/${id}/result`, {
      json: { score, maxScore, isPassed },
    });
  },
});
