import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { FormContainer, FormCard, MaterialInput } from "./utils";

export default function Login() {
  const { login } = useAuth();
  const username = useInput("");
  const password = useInput("");
  return (
    <FormContainer>
      <FormCard>
        <section className="flex flex-col space-y-10">
          <div className="text-center text-4xl text-white font-medium">
            Not Whatsapp
          </div>

          <form
            className="space-y-10"
            onSubmit={(e) => {
              e.preventDefault();
              login(username.value, password.value).catch(() => {
                alert("Username or password is incorrect");
              });
            }}
          >
            <MaterialInput
              value={username.value}
              onChange={username.onChange}
              label="Username"
              type="text"
              name="username"
            />
            <MaterialInput
              value={password.value}
              onChange={password.onChange}
              label="Password"
              type="password"
              name="password"
            />
            <button
              type="submit"
              className="transform w-full rounded-sm bg-green py-2 font-bold duration-300 text-dark hover:bg-dark hover:text-green_lite "
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-white">
            No account?
            <Link
              to="/register"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline ml-2"
            >
              Create One
            </Link>
          </p>
        </section>
      </FormCard>
    </FormContainer>
  );
}
