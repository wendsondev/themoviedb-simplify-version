import { api } from '@Services/api';
import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';

export function useFetch<T>(url: string, config?: AxiosRequestConfig) {
  const { data, error } = useSWR(url, async () => {
    const { data } = await api.get<T>(url, config);

    return data;
  });

  return { data, error };
}
