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
