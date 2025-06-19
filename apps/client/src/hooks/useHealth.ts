import { useApi } from './useApi';
import { useQuery } from '@tanstack/react-query';

export const useHealth = () => {
  const getHealth = useApi('getHealth');
  return useQuery({
    queryKey: ['getHealth'],
    queryFn: getHealth,
  });
};
