import { useCallback, useState } from "react";

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export default function useFetch<T>(): [
  FetchState<T>,
  (url: RequestInfo | URL, init?: RequestInit) => void
] {
  const [state, setState] = useState<FetchState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const dispatch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      setState({
        ...state,
        loading: true,
        error: null,
      });
      try {
        const response = await fetch(input, init);
        const data = await response.json();
        setState({
          loading: false,
          data,
          error: null,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error as Error,
        });
      }
    },
    [state]
  );

  return [state, dispatch];
}

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function useFetchAll<T>(): [
  FetchState<T[]>,
  (url: RequestInfo | URL, init?: RequestInit) => void
] {
  const [state, setState] = useState<FetchState<T[]>>({
    loading: false,
    data: null,
    error: null,
  });

  const dispatch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      setState({
        ...state,
        loading: true,
        error: null,
      });
      try {
        const response = await fetch(input, init);
        const data: PaginatedResponse<T> = await response.json();
        let results = data.results;
        let next = data.next;
        while (next) {
          const response = await fetch(next, init);
          if (!response.ok) {
            break;
          }
          const _data: PaginatedResponse<T> = await response.json();
          results = [...results, ..._data.results];
          next = data.next;
        }
        setState({ loading: false, data: results, error: null });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error as Error,
        });
      }
    },
    [state]
  );

  return [state, dispatch];
}
