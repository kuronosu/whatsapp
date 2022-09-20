import { Link } from "react-router-dom";
import Settings from "../config";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import { FormCard, FormContainer, MaterialInput } from "./utils";

function register(
  {
    username,
    email,
    password1,
    password2,
  }: { username: string; email: string; password1: string; password2: string },
  login: any
) {
  fetch(Settings.urls.auth.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      email: email.trim(),
      password: password1.trim(),
      password2: password2.trim(),
    }),
  })
    .then((res) => {
      if (res.ok) {
        login(username, password1);
      } else {
        res.json().then((data) => {
          let msg = "";
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              msg += key + "\n";
              for (let index = 0; index < data[key].length; index++) {
                msg += "\t" + data[key][index] + "\n";
              }
            }
          }
          alert(msg);
        });
      }
    })
    .catch(() => {
      alert("Something went wrong");
    });
}

export default function Register() {
  const { login } = useAuth();
  const username = useInput("");
  const email = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");
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
              if (password1.value.trim() !== password2.value.trim()) {
                return alert("Passwords don't match");
              }
              if (password1.value.trim().length < 8) {
                return alert("Password must be atleast 8 characters long");
              }
              if (!username.value.trim() || !email.value.trim()) {
                return alert("Username and email are required");
              }
              register(
                {
                  username: username.value.trim(),
                  email: email.value.trim(),
                  password1: password1.value.trim(),
                  password2: password2.value.trim(),
                },
                login
              );
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
              value={email.value}
              onChange={email.onChange}
              label="Email"
              type="email"
              name="email"
            />
            <MaterialInput
              value={password1.value}
              onChange={password1.onChange}
              label="Password"
              type="password"
              name="password1"
            />
            <MaterialInput
              value={password2.value}
              onChange={password2.onChange}
              label="Confirm Password"
              type="password"
              name="password2"
            />
            <button
              type="submit"
              className="transform w-full rounded-sm bg-green py-2 font-bold duration-300 text-dark hover:bg-dark hover:text-green_lite "
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-white">
            Already have login and password?
            <Link
              to="/login"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline ml-2"
            >
              Sign in
            </Link>
          </p>
        </section>
      </FormCard>
    </FormContainer>
  );
}
