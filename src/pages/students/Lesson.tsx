import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { getCourseById } from "../../data/courses";
import { markLessonCompleted } from "../../services/progressService";

function Lesson() {
  const { id } = useParams();
  const { user } = useAuth();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const course = getCourseById("react-fundamentals");
  const lessonIndex = Math.max(0, Number(id ?? "1") - 1);
  const lesson = useMemo(
    () => course.lessons[lessonIndex] ?? course.lessons[0],
    [course.lessons, lessonIndex]
  );
  const nextLessonNumber = Math.min(lessonIndex + 2, course.lessons.length);

  const handleCompleteLesson = async () => {
    if (!user) {
      return;
    }

    try {
      setSaveStatus("saving");
      await markLessonCompleted(user.uid, course.id, lesson.id);
      setSaveStatus("saved");
    } catch (error) {
      console.error("Unable to save lesson progress:", error);
      setSaveStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-green-600">
        {course.title.toUpperCase()}
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        Lesson {id}: {lesson.title}
      </h1>

      <div className="mt-6 aspect-video rounded-2xl bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-5xl">▶</div>
          <p className="mt-3 text-sm text-gray-300">
            Lesson video
          </p>
        </div>
      </div>

      <article className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold">About this lesson</h2>

        <p className="mt-4 leading-7 text-gray-600">
          In this lesson, you will learn the fundamentals of React
          components and how components help you build reusable user
          interface elements.
        </p>

        <p className="mt-4 leading-7 text-gray-600">
          After completing this lesson, you should understand how
          components are created and how they can be combined to build
          larger applications.
        </p>
      </article>

      <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-green-800">Course progress</p>
            <p className="mt-1 text-sm text-green-700">
              Mark this lesson complete to save it to Firebase.
            </p>
          </div>

          <button
            onClick={handleCompleteLesson}
            disabled={saveStatus === "saving"}
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {saveStatus === "saving" ? "Saving..." : "Mark Complete"}
          </button>
        </div>

        {saveStatus === "saved" && (
          <p className="mt-3 text-sm font-medium text-green-700">
            Lesson progress saved.
          </p>
        )}

        {saveStatus === "error" && (
          <p className="mt-3 text-sm font-medium text-red-600">
            Could not save progress. Please try again.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row">
        <Link
          to="/student/course/react-fundamentals"
          className="rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
        >
          ← Course
        </Link>

        <Link
          to={`/student/lesson/${nextLessonNumber}`}
          className="rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}

export default Lesson;
