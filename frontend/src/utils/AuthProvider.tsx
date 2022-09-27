import { useEffect } from "react";
import Settings from "../config";
import useAuth from "../hooks/useAuth";
import { useAuthLoading } from "../store/atoms/auth";

type Props = {
  children: React.ReactNode;
  loading: React.ReactNode;
};

export default function AuthProvider({ children, loading: Loading }: Props) {
  const { token, refresh } = useAuth();
  const [loading, setLoading] = useAuthLoading();
  useEffect(() => {
    const endLoading = () => setLoading(false);
    refresh(null, false).then(endLoading).catch(endLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let c: NodeJS.Timer | undefined = undefined;
    if (token) {
      c = setInterval(() => {
        refresh(null, true).catch((e) => console.log(e.message));
      }, Settings.access_token_lifetime);
    }
    return () => clearInterval(c);
  }, [refresh, token]);
  return loading ? <>{Loading}</> : <>{children}</>;
}
