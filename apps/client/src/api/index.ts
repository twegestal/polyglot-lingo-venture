import ky from 'ky';
import { healthApi } from './healthApi';

export const api = (apiClient: typeof ky) => Object.freeze({ ...healthApi(apiClient) });
