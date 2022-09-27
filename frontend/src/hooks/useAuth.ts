import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

import { useLocalStorage } from "./useLocalStorage";
import { useAuthTokens } from "../store/atoms/auth";
import Settings from "../config";

const authUrls = Settings.urls.auth;

const refreshTokenKey = "user.refresh";

const emptyToken = {
  access: null,
  refresh: null,
};

type UserData = {
  username: string;
  email?: string;
};

type DecodedToken = {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
} & UserData;

const useAuth = () => {
  const [refreshToken, setRefreshToken, clearRefreshToken] = useLocalStorage(
    refreshTokenKey,
    ""
  );
  const [auth, setAuth] = useAuthTokens();
  const navigate = useNavigate();
  // call this function when you want to authenticate the user
  const login = useCallback(
    async (username: string, password: string, okUrl = "/") => {
      try {
        const res = await fetch(authUrls.token, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          throw new Error("Username or password incorrect");
        }
        const data = await res.json();
        setRefreshToken(data.refresh);
        setAuth(data);
        if (okUrl) navigate(okUrl);
      } catch (error) {
        setAuth(emptyToken);
        clearRefreshToken();
        throw error;
      }
    },
    [setAuth, setRefreshToken, navigate, clearRefreshToken]
  );

  const refresh = useCallback(
    async (okRedirect = null, redirectOnError = false) => {
      try {
        if (!refreshToken && !auth.refresh) {
          throw new Error("No refresh token");
        }
        const _refreshToken = refreshToken || auth.refresh;
        const res = await fetch(authUrls.refresh, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: _refreshToken }),
        });
        if (!res.ok) {
          clearRefreshToken();
          setAuth(emptyToken);
          throw new Error("Invalid refresh token");
        }
        const data = await res.json();
        if (data.refresh) setRefreshToken(data.refresh);
        setAuth(data);
        if (okRedirect) {
          navigate(okRedirect);
        }
      } catch (error) {
        clearRefreshToken();
        setAuth(emptyToken);
        if (redirectOnError) {
          navigate("/login");
        } else {
          throw error;
        }
      }
    },
    [
      refreshToken,
      setAuth,
      setRefreshToken,
      navigate,
      clearRefreshToken,
      auth.refresh,
    ]
  );

  // call this function to sign out logged in user
  const logout = useCallback(
    (redirectUrl?: string) => {
      setAuth(emptyToken);
      clearRefreshToken();
      if (redirectUrl) {
        navigate(redirectUrl);
      }
    },
    [navigate, setAuth, clearRefreshToken]
  );

  const data = useJwt<DecodedToken>(auth.access || "");

  return useMemo(
    () => ({
      login,
      logout,
      refresh,
      token: auth.access,
      isExpired: data?.isExpired,
      decodedToken: data?.decodedToken,
    }),
    [login, logout, refresh, auth, data]
  );
};

export default useAuth;
