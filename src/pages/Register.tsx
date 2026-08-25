
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/Config";

function Register() {
  const [name, setName] = useState("");
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

    // Basic validation
    if (name.trim().length === 0) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Firebase Authentication account
      console.log(
        "1. Creating Firebase Authentication account..."
      );

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      console.log(
        "2. Firebase Auth account created:",
        user.uid
      );

      // 2. Save user's name to Firebase Auth profile
      console.log(
        "3. Updating Firebase Auth profile..."
      );

      await updateProfile(user, {
        displayName: name.trim(),
      });

      console.log(
        "4. Firebase Auth profile updated."
      );

      // 3. Create user profile in Firestore
      try {
        console.log(
          "5. Creating Firestore user profile..."
        );

        await setDoc(doc(db, "users", user.uid), {
          name: name.trim(),
          email: user.email,
          createdAt: serverTimestamp(),
        });

        console.log(
          "6. Firestore user profile created."
        );
      } catch (firestoreError) {
        console.error(
          "🔥 FIRESTORE ERROR:",
          firestoreError
        );

        throw firestoreError;
      }

      // 4. Firebase automatically signs the user in
      // after createUserWithEmailAndPassword().
      // Sign them out before sending them to Login.
      console.log("7. Signing user out...");

      await signOut(auth);

      console.log(
        "8. User signed out successfully."
      );

      // 5. Redirect to login
      console.log(
        "9. Redirecting to login..."
      );

      navigate("/login");

    } catch (error: unknown) {
      console.error(
        "❌ REGISTRATION ERROR:",
        error
      );

      if (
        error &&
        typeof error === "object" &&
        "code" in error
      ) {
        const firebaseError = error as {
          code: string;
          message?: string;
        };

        console.error(
          "Firebase error code:",
          firebaseError.code
        );

        console.error(
          "Firebase error message:",
          firebaseError.message
        );

        switch (firebaseError.code) {
          case "auth/email-already-in-use":
            setError(
              "An account with this email already exists."
            );
            break;

          case "auth/invalid-email":
            setError(
              "Please enter a valid email address."
            );
            break;

          case "auth/weak-password":
            setError(
              "Password must be at least 6 characters."
            );
            break;

          case "auth/network-request-failed":
            setError(
              "Network error. Please check your internet connection."
            );
            break;

          case "permission-denied":
          case "firestore/permission-denied":
            setError(
              "Unable to create your profile. Please check your Firestore permissions."
            );
            break;

          default:
            setError(
              "Something went wrong. Please try again."
            );
        }
      } else {
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
            Create your account
          </h1>

          <p className="text-sm text-zinc-600">
            Sign up to get started
          </p>
        </div>

        {/* Error Message */}
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
          {loading
            ? "Creating account..."
            : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              font-medium
              text-green-700
              hover:text-green-800
            "
          >
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;

