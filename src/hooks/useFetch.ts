import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import { api } from '../services/api';

export function useFetch<T>(url: string, config?: AxiosRequestConfig) {
  const { data, error } = useSWR(url, async () => {
    const { data } = await api.get<T>(url, config);

    return data;
  });

  return { data, error };
}
