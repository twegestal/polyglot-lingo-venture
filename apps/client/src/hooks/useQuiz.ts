import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from './useApi';
import { useAuthedQuery } from './useAuthedQuery';

export const useQuizzes = () => {
  const getAllQuizzes = useApi('getAllQuizzes');
  return useAuthedQuery({
    queryKey: ['quizzes'],
    queryFn: getAllQuizzes,
  });
};

export const useQuiz = (id?: string) => {
  const getQuizById = useApi('getQuizById');
  return useAuthedQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuizById({ id: id! }),
    enabled: !!id,
  });
};

export const useSubmitQuizResult = () => {
  const submitQuizResult = useApi('submitQuizResult');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitQuizResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

export const useCreateQuiz = () => {
  const createQuiz = useApi('createQuiz');
  return useMutation({ mutationFn: createQuiz });
};

export const useQuizStats = () => {
  const getStats = useApi('getStats');
  return useAuthedQuery({
    queryKey: ['stats'],
    queryFn: getStats
  });
}
