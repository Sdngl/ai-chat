import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/Config";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">

      <div className="rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-2xl font-bold text-zinc-900">
          Welcome to Learno
        </h1>

        <p className="mt-2 text-zinc-600">
          Hello, {user?.displayName || "Learner"} 👋
        </p>

        <p className="mt-1 text-sm text-zinc-400">
          {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="
            mt-6
            rounded-xl
            bg-green-600
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-green-700
          "
        >
          Log Out
        </button>

      </div>

    </main>
  );
}

export default Dashboard;