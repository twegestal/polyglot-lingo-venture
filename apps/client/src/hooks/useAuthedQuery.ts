import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../contexts/auth';

export const useAuthedQuery = <TQueryFnData, TError = unknown, TData = TQueryFnData>(
  options: UseQueryOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> => {
  const { token } = useAuth();

  return useQuery({
    staleTime: Infinity,
    enabled: !!token && (options.enabled ?? true),
    ...options,
  });
};
