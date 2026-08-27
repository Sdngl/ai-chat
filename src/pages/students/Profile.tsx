import { useEffect, useState } from "react";

import { useAuth } from "../../context/useAuth";
import { subscribeUserProfile } from "../../services/userService";
import type { UserProfile } from "../../types/user";

function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    return subscribeUserProfile(
      user.uid,
      (nextProfile) => {
        setProfile(nextProfile);
      },
      () => {
        setError("Unable to load profile.");
      }
    );
  }, [user]);

  const displayName = profile?.displayName || user?.displayName || "Student";
  const email = profile?.email || user?.email || "student@example.com";
  const isProfileLoading = Boolean(user && !profile && !error);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <p className="mt-2 text-gray-500">
        Manage your personal information.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col items-center border-b border-gray-100 pb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-600">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-bold">{displayName}</h2>

          <p className="text-sm text-gray-500">
            {email}
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {(authLoading || isProfileLoading) && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
            Loading profile...
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${profile?.xp ?? 0}`, "XP"],
            [`${profile?.level ?? 1}`, "Level"],
            [`${profile?.coins ?? 0}`, "Coins"],
            [`${profile?.streak ?? 0}`, "Streak"],
            [`${profile?.totalQuizzes ?? 0}`, "Quizzes"],
            [`${profile?.totalCorrectAnswers ?? 0}`, "Correct"],
            [`${profile?.bestScore ?? 0}`, "Best Score"],
            [`x${profile?.bestCombo ?? 0}`, "Best Combo"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="mt-1 text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Full Name</label>

            <input
              type="text"
              value={displayName}
              readOnly
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              disabled
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700">
            Saved by Firebase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
