import { Quiz, quizValidator } from 'api';
import ky from 'ky';
import { z } from 'zod';

const prefixUrl = '/quizzes/';

export const quizApi = (apiClient: typeof ky) => ({
  getAllQuizzes: async () => {
    const response: Quiz[] = await apiClient.get(`${prefixUrl}`).json();
    return z.array(quizValidator).parse(response);
  },

  getQuizById: async () => {
    const response: Quiz = await apiClient.get(`${prefixUrl}`).json();
    return quizValidator.parse(response);
  },
});
