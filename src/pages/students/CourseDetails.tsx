import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { getCourseById } from "../../data/courses";
import { getCourseProgress } from "../../services/progressService";
import type { CourseProgress } from "../../types/progress";

function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const course = getCourseById(id);
  const [savedProgress, setSavedProgress] = useState<CourseProgress | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    getCourseProgress(user.uid, course.id)
      .then(setSavedProgress)
      .catch((error: unknown) => {
        console.error("Unable to load course progress:", error);
      });
  }, [course.id, user]);

  const progress = savedProgress?.progressPercentage ?? course.progress;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-3xl bg-green-600 p-7 text-white sm:p-10">
        <p className="text-sm font-medium text-green-100">
          WEB DEVELOPMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {course.title}
        </h1>

        <p className="mt-3 max-w-2xl text-green-100">
          {course.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-5 text-sm">
          <span>{course.lessons.length} Lessons</span>
          <span>{course.level}</span>
          <span>{progress}% Complete</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">Course Content</h2>

          <div className="mt-4 space-y-3">
            {course.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/student/lesson/${index + 1}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-green-300"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-green-600">
                    {index + 1}
                  </span>

                  <div>
                    <span className="font-medium">{lesson.title}</span>
                    <p className="mt-1 text-sm text-gray-500">{lesson.duration}</p>
                  </div>
                </div>

                <span className="text-sm text-gray-400">
                  {savedProgress?.completedLessons.includes(lesson.id) || lesson.completed
                    ? "Done"
                    : "Start"}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="font-bold">Your Progress</h3>

          <div className="mt-4 h-3 rounded-full bg-gray-100">
            <div
              className="h-3 rounded-full bg-green-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {progress}% completed
          </p>

          <Link
            to="/student/lesson/1"
            className="mt-5 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
          >
            Continue Learning
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
