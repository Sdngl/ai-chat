import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
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
            Create your account
          </h1>

          <p className="text-sm text-zinc-600">
            Sign up to get started
          </p>

        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="name"
            className="text-sm font-medium text-zinc-700"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            required
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* Submit */}
        <button
          type="submit"
          className="
            rounded-xl
            bg-green-600
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-green-700
          "
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-700 hover:text-green-800"
          >
            Log in
          </Link>
        </p>

      </form>

    </main>
  );
}

export default Register;
