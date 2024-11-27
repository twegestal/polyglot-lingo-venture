import { useMemo } from 'react';
import ky from 'ky';
import { api } from '../api';

const prefixUrl = '/api';
type ApiMethod = keyof ReturnType<typeof api>;

export const useApi = <T extends ApiMethod>(method: T) => {
  const apiClient = useMemo(
    () =>
      ky.create({
        prefixUrl,
      }),
    [],
  );

  return api(apiClient)[method];
};
