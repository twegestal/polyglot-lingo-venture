import { useState } from 'react';
import { useApi } from './useApi';
import { Health } from 'api';

export const useHealth = () => {
  const healthApi = useApi('getHealth');

  const [health, setHealth] = useState<Health>();

  const getHealth = async () => {
    try {
      const response = await healthApi();
      setHealth(response);
    } catch (error) {
      console.error('Error fetching health ', error);
    }
  };

  return { health, getHealth };
};
