import { useState } from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e: any) => setValue(e.target.value),
  };
}

const LoginContainer = tw.div<any>`
flex
w-full
h-full
justify-center
items-center
bg-green_lite
`;

const CardLogin = tw.div<any>`
p-7
flex
w-96
flex-col
shadow-2xl
rounded-xl
bg-zinc-900
`;

function MaterialInput({ label, type, name, ...props }: any) {
  return (
    <div className="py-2 relative border-b-2 focus-within:border-indigo-500">
      <input
        type={type}
        name={name}
        title={name}
        id={name}
        placeholder=" "
        autoComplete="off"
        className="block w-full appearance-none focus:outline-none bg-transparent text-white"
        {...props}
      />
      <label
        htmlFor={name}
        className={`absolute top-2 left-0 text-gray-500 duration-300 origin-0 cursor-text ${
          props.value && "text-2xl"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Login() {
  const { login } = useAuth();
  const username = useInput("");
  const password = useInput("");
  return (
    <LoginContainer>
      <CardLogin>
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
              {...username}
              label="Username"
              type="text"
              name="username"
            />
            <MaterialInput
              {...password}
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
      </CardLogin>
    </LoginContainer>
  );
}
