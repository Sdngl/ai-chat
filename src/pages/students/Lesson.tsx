import { Link, useParams } from "react-router-dom";

function Lesson() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-green-600">
        REACT FUNDAMENTALS
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        Lesson {id}: Understanding Components
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

      <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row">
        <Link
          to="/student/course/react-fundamentals"
          className="rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
        >
          ← Course
        </Link>

        <Link
          to="/student/lesson/2"
          className="rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}

export default Lesson;