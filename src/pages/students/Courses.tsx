import { Link } from "react-router-dom";
import { courses } from "../../data/courses";

function Courses() {
  return (
    <div>
      <div>
        <p className="text-sm font-medium text-green-600">LEARNING</p>

        <h1 className="mt-1 text-3xl font-bold">Explore Courses</h1>

        <p className="mt-2 text-gray-500">
          Discover courses and build new skills.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-500 sm:max-w-md"
        />

        <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none">
          <option>All Categories</option>
          <option>Programming</option>
          <option>Web Development</option>
          <option>Database</option>
        </select>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-40 items-end bg-green-100 p-5">
              <span className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-green-700">
                {course.category}
              </span>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold">{course.title}</h2>

              <div className="mt-3 flex gap-4 text-sm text-gray-500">
                <span>{course.level}</span>
                <span>{course.lessons.length} lessons</span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {course.students.toLocaleString()} students
              </p>

              <Link
                to={`/student/course/${course.id}`}
                className="mt-5 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
