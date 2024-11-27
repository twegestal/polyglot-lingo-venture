import ky from 'ky';
import { healthValidator } from 'api';

export const healthApi = (apiClient: typeof ky) => ({
  getHealth: async () => {
    const response = await apiClient.get('health').json();
    return healthValidator.parse(response);
  },
});
