import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Chat() {
  const { decodedToken, logout, refresh } = useAuth();
  return (
    <div>
      <nav>
        {decodedToken ? (
          <span onClick={() => logout("/")}>Logout</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <p>
        Chat: tokens{" "}
        {
          decodedToken ? decodedToken.username : "No token"
        }
      </p>
      <button onClick={() => refresh(null, true)}>Refresh</button>
    </div>
  );
}
