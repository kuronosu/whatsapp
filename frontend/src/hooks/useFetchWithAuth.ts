import { useCallback } from "react";
import useAuth from "./useAuth";
import useFetch, { FetchState, useFetchAll } from "./useFetch";

export default function useFetchWithAuth<T>(): [
  FetchState<T>,
  (url: RequestInfo | URL, init?: RequestInit) => void,
  null | Response
] {
  const { token } = useAuth();
  const [data, dispatch, resRef] = useFetch<T>();
  const _fetch = useCallback(
    (url: RequestInfo | URL, init: RequestInit = {}) => {
      if (token) {
        init = {
          ...init,
          headers: { ...init.headers, Authorization: `Bearer ${token}` },
        };
      }
      dispatch(url, init);
    },
    [token, dispatch]
  );
  return [data, _fetch, resRef];
}

export function useFetchAllWithAuth<T>(): [
  FetchState<T[]>,
  (url: RequestInfo | URL, init?: RequestInit) => void
] {
  const { token } = useAuth();
  const [data, dispatch] = useFetchAll<T>();
  const _fetch = useCallback(
    (url: RequestInfo | URL, init: RequestInit = {}) => {
      if (token) {
        init = {
          ...init,
          headers: { ...init.headers, Authorization: `Bearer ${token}` },
        };
      }
      dispatch(url, init);
    },
    [token, dispatch]
  );
  return [data, _fetch];
}
