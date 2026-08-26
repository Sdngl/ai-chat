import { useEffect, useState } from "react";

import { useAuth } from "../../context/useAuth";
import { courses } from "../../data/courses";
import { getCourseProgress } from "../../services/progressService";
import { subscribeUserProfile } from "../../services/userService";
import type { CourseProgress } from "../../types/progress";
import type { UserProfile } from "../../types/user";

function Progress() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgress>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    return subscribeUserProfile(
      user.uid,
      setProfile,
      () => setError("Unable to load player stats.")
    );
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    Promise.all(
      courses.map(
        async (course) =>
          [course.id, await getCourseProgress(user.uid, course.id)] as const
      )
    )
      .then((items) => {
        const savedProgress: Record<string, CourseProgress> = {};

        items.forEach(([courseId, progress]) => {
          if (progress) {
            savedProgress[courseId] = progress;
          }
        });

        setCourseProgress(
          savedProgress
        );
      })
      .catch(() => setError("Unable to load course progress."));
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold">My Progress</h1>

      <p className="mt-2 text-gray-500">
        Track your learning progress and achievements.
      </p>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [`${profile?.xp ?? 0}`, "Total XP"],
          [`${profile?.level ?? 1}`, "Level"],
          [`${profile?.totalCorrectAnswers ?? 0}`, "Correct Answers"],
          [`${profile?.longestStreak ?? 0}`, "Longest Streak"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <p className="text-2xl font-bold">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold">Course Progress</h2>

        <div className="mt-6 space-y-6">
          {courses.map((course) => (
            <div key={course.id}>
              {(() => {
                const persistedProgress = courseProgress[course.id];
                const percent = persistedProgress?.progressPercentage ?? course.progress;

                return (
                  <>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{course.title}</span>
                <span className="text-gray-500">{percent}%</span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
