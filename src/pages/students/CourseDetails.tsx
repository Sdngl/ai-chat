import { Link, useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  const lessons = [
    "Introduction",
    "Understanding Components",
    "Props and State",
    "Event Handling",
    "Working with Forms",
    "Final Project",
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-3xl bg-green-600 p-7 text-white sm:p-10">
        <p className="text-sm font-medium text-green-100">
          WEB DEVELOPMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          React Fundamentals
        </h1>

        <p className="mt-3 max-w-2xl text-green-100">
          Learn the fundamentals of React and build modern interactive
          web applications.
        </p>

        <div className="mt-6 flex flex-wrap gap-5 text-sm">
          <span>24 Lessons</span>
          <span>Beginner</span>
          <span>72% Complete</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">Course Content</h2>

          <div className="mt-4 space-y-3">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson}
                to={`/student/lesson/${index + 1}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-green-300"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-green-600">
                    {index + 1}
                  </span>

                  <span className="font-medium">{lesson}</span>
                </div>

                <span className="text-sm text-gray-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="font-bold">Your Progress</h3>

          <div className="mt-4 h-3 rounded-full bg-gray-100">
            <div className="h-3 w-[72%] rounded-full bg-green-600" />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            72% completed
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