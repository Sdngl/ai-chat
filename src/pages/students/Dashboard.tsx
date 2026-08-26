import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase/Config";
import { useAuth } from "../../context/useAuth";
import CompanionCard from "../../components/companion/CompanionCard";
import SkillMap from "../../components/skill-map/SkillMap";
import { companionState, dailyQuests } from "../../data/companion";
import { courses } from "../../data/courses";
import { skillRegions } from "../../data/skillMap";
import { subscribeUserProfile } from "../../services/userService";
import { getNextLevelXp } from "../../utils/levelLogic";
import type { UserProfile } from "../../types/user";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    return subscribeUserProfile(
      user.uid,
      setProfile,
      () => setProfileError("Unable to load saved progress right now.")
    );
  }, [user]);

  const persistedCompanion = useMemo(
    () =>
      profile
        ? {
            ...companionState,
            level: profile.level,
            xp: profile.xp,
            nextLevelXp: getNextLevelXp(profile.level),
            streak: profile.streak,
          }
        : companionState,
    [profile]
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <p className="text-sm font-medium text-green-600">
          Welcome back 👋
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Hello, {user?.displayName || "Learner"}!
        </h1>

        <p className="mt-2 text-gray-500">
          Ready to continue your learning journey?
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {user?.email}
        </p>
      </section>

      {profileError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {profileError}
        </div>
      )}

      <CompanionCard companion={persistedCompanion} compact />

      <section>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-green-600">NEXT QUEST</p>
            <h2 className="mt-1 text-xl font-bold">{dailyQuests[0].title}</h2>
            <p className="mt-1 text-sm text-gray-500">{dailyQuests[0].description}</p>
          </div>

          <Link
            to="/student/map"
            className="rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-center text-sm font-semibold text-green-700 transition hover:bg-green-100"
          >
            Continue Adventure
          </Link>
        </div>

        <div className="mt-5">
          <SkillMap regions={skillRegions.slice(0, 1)} />
        </div>
      </section>

      {/* Continue Learning */}
      <section className="rounded-3xl bg-green-600 p-6 text-white sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-green-100">
            CONTINUE LEARNING
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            React Fundamentals
          </h2>

          <p className="mt-2 text-green-100">
            Components, Props and State
          </p>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Course Progress</span>
              <span>72%</span>
            </div>

            <div className="h-2 rounded-full bg-green-500">
              <div
                className="h-2 rounded-full bg-white"
                style={{ width: "72%" }}
              />
            </div>
          </div>

          <Link
            to="/student/course/react-fundamentals"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-600 transition hover:bg-gray-100"
          >
            Continue Learning
          </Link>
        </div>
      </section>

      {/* Learning Statistics */}
      <section>
        <h2 className="text-xl font-bold">Your Learning</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [String(courses.length), "Courses Enrolled"],
            [`${profile?.level ?? 1}`, "Player Level"],
            [`${profile?.coins ?? 0}`, "Coins"],
            [`${profile?.streak ?? 0}`, "Day Streak"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <p className="text-2xl font-bold">{value}</p>

              <p className="mt-1 text-sm text-gray-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* My Courses */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">My Courses</h2>

            <p className="mt-1 text-sm text-gray-500">
              Continue your enrolled courses.
            </p>
          </div>

          <Link
            to="/student/courses"
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            View All →
          </Link>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Course Header */}
              <div className="h-32 bg-green-100 p-5">
                <p className="text-sm font-medium text-green-700">
                  {course.category}
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {course.title}
                </h3>
              </div>

              {/* Course Details */}
              <div className="p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Progress
                  </span>

                  <span className="font-semibold">
                    {course.progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-green-600"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {course.lessons.length} lessons
                </p>

                <Link
                  to={`/student/course/${course.id}`}
                  className="mt-4 block rounded-xl bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                >
                  Continue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Courses */}
      <section>
        <div>
          <h2 className="text-xl font-bold">
            Recommended For You
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Courses that can help you build new skills.
          </p>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {[
            ["JavaScript Essentials", "Web Development"],
            ["UI/UX Design", "Design"],
            ["Data Structures", "Programming"],
          ].map(([title, category]) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex h-28 items-center justify-center rounded-xl bg-gray-100">
                <span className="text-sm font-semibold text-gray-400">
                  Course Image
                </span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase text-green-600">
                {category}
              </p>

              <h3 className="mt-1 font-bold">
                {title}
              </h3>

              <Link
                to="/student/courses"
                className="mt-4 inline-block text-sm font-semibold text-green-600"
              >
                Explore Course →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-green-600">
              LEARNO AI
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Need help with your studies?
            </h2>

            <p className="mt-1 max-w-xl text-sm text-gray-500">
              Ask Learno AI to explain concepts, help you understand
              lessons, or prepare for quizzes.
            </p>
          </div>

          <button
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Ask Learno AI
          </button>
        </div>
      </section>

      {/* Logout */}
      <section className="border-t border-gray-200 pt-6">
        <button
          onClick={handleLogout}
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          Log Out
        </button>
      </section>
    </div>
  );
}

export default Dashboard;
