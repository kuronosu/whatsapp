import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { token } = useAuth();
  return (
    <>
      <div>
        {token ? <Link to="/chat">Chat</Link> : <Link to="/login">Login</Link>}
      </div>
      <p>Home</p>;
    </>
  );
}
