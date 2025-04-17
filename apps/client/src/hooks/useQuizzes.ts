import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';
import { useAuth } from '../contexts/auth';

export const useQuizzes = () => {
  const { token } = useAuth();
  const getAllQuizzes = useApi('getAllQuizzes');

  return useQuery({
    queryKey: ['quizzes'],
    queryFn: getAllQuizzes,
    staleTime: Infinity,
    enabled: !!token,
  });
};
