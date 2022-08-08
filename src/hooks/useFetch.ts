import useSWR from 'swr';
import { api } from '../services/api';

export function useFetch<T>(url: string, signal?: AbortSignal) {
  const { data, error } = useSWR(url, async () => {
    const { data } = await api.get<T>(url, { signal });

    return data;
  });

  return { data, error };
}
