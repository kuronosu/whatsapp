import { Link } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useFetchWithAuth from "../hooks/useFetchWithAuth";

type User = {
  id: number;
  username: string;
  email: string;
};

type PaginatedRespopnse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export default function Chat() {
  const { decodedToken, logout, token } = useAuth();
  // const [users, setUsers] = useState([]);
  const [users, fetchUsers] = useFetchWithAuth<PaginatedRespopnse<User>>();
  useEffect(() => {
    fetchUsers("http://localhost:8000/api/accounts/friends/add/users/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <nav>
        {decodedToken ? (
          <span onClick={() => logout("/")}>Logout</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <ul>
        {users.data?.results.map((user: any) => (
          <li key={user.id}>
            <button
              onClick={() => {
                fetch(
                  `http://localhost:8000/api/accounts/friends/add/${user.id}/`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                ).then((res) => console.log(res.status));
              }}
            >
              {user.username}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          fetch("http://localhost:8000/api/accounts/friends/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        Users
      </button>
    </div>
  );
}
