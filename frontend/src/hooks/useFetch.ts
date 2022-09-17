import { useCallback, useState } from "react";

type FetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export default function useFetch<T>(): [
  FetchResponse<T>,
  (url: string) => void
] {
  const [state, setState] = useState<FetchResponse<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const dispatch = useCallback(
    async (
      input: RequestInfo | URL,
      includeAuth: boolean = false,
      init?: RequestInit
    ) => {
      setState({
        ...state,
        loading: true,
        error: null,
      });
      try {
        // TODO: includeAuth
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
