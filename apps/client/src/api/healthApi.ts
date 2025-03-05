import ky from 'ky';
import { Health, healthValidator } from 'api';

export const healthApi = (apiClient: typeof ky) => ({
  getHealth: async () => {
    const response: Health = await apiClient.get('health').json();
    return healthValidator.parse(response);
  },
});
