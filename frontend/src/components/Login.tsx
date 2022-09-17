import { useState } from "react";
import useAuth from "../hooks/useAuth";

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e: any) => setValue(e.target.value),
  };
}

export default function Login() {
  const { login } = useAuth();
  const username = useInput("");
  const password = useInput("");

  return (
    <div>
      <p>Login</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username.value, password.value);
        }}
      >
        <label>
          Username: <input {...username} type="text" name="username" />
        </label>
        <br />
        <label>
          Password: <input {...password} type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
