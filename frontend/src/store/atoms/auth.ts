import { atom } from "recoil";
import { useReducedState } from "../useReducedState";

type AuthTokens = {
  access: string | null;
  refresh: string | null;
};

type AuthStateType = {
  loading: boolean;
  tokens: AuthTokens;
};

const authState = atom<AuthStateType>({
  key: "authState",
  default: {
    loading: true, // true when we don't know if the user is logged in or not
    tokens: {
      access: null,
      refresh: null,
    },
  },
});

export default authState;

export const useAuthTokens = () => {
  return useReducedState(
    authState,
    (state) => state.tokens,
    (state, tokens) => ({ ...state, tokens })
  );
};

export const useSetAuthTokens = () => {
  return useAuthTokens()[1];
};

export const useGetAuthTokens = () => {
  return useAuthTokens()[0];
};

export const useAuthLoading = () => {
  return useReducedState<AuthStateType, boolean>(
    authState,
    (state) => state.loading,
    (state, loading) => ({ ...state, loading })
  );
};

export const useSetAuthLoading = () => {
  return useAuthLoading()[1];
};

export const useGetAuthLoading = () => {
  return useAuthLoading()[0];
};
