import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/Config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in user:", userCredential.user);

      // Login successful
      navigate("/");

    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setError("No account exists with this email.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many login attempts. Please try again later."
          );
          break;

        default:
          setError(
            "Something went wrong. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        bg-zinc-50
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          flex
          w-full
          max-w-md
          flex-col
          gap-6
          rounded-2xl
          bg-white
          px-8
          py-10
          shadow-xl
        "
      >

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-green-600
              text-xl
              font-bold
              text-white
            "
          >
            ✦
          </div>

          <span className="text-2xl font-semibold text-zinc-900">
            Learno
          </span>

        </div>

        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">

          <h1 className="text-2xl font-bold text-zinc-900">
            Welcome back
          </h1>

          <p className="text-sm text-zinc-600">
            Log in to continue your journey
          </p>

        </div>

        {/* Error */}
        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="email"
            className="text-sm font-medium text-zinc-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-zinc-800
              outline-none
              placeholder:text-zinc-400
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          />

        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-zinc-800
              outline-none
              placeholder:text-zinc-400
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          />

        </div>

        {/* Row */}
        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-zinc-700">

            <input
              type="checkbox"
              className="
                h-4
                w-4
                rounded
                border-zinc-300
                text-green-600
                focus:ring-green-500
              "
            />

            Remember me
          </label>

          <a
            href="#"
            className="text-sm font-medium text-green-700 hover:text-green-800"
          >
            Forgot password?
          </a>

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-green-600
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-700 hover:text-green-800"
          >
            Sign up
          </Link>
        </p>

      </form>

    </main>
  );
}

export default Login;