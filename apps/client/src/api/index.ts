import ky from 'ky';
import { healthApi } from './healthApi';
import { quizApi } from './quizApi';

export const api = (apiClient: typeof ky) =>
  Object.freeze({
    ...healthApi(apiClient),
    ...quizApi(apiClient),
  });
