import { Link } from "react-router-dom";
import { courses } from "../../data/courses";

function MyLearning() {
  return (
    <div>
      <h1 className="text-3xl font-bold">My Learning</h1>

      <p className="mt-2 text-gray-500">
        Track all the courses you are currently learning.
      </p>

      <div className="mt-8 space-y-4">
        {courses.map((course) => (
          <div
            key={course.title}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <h2 className="font-bold">{course.title}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  {course.progress >= 100 ? "Completed" : "In Progress"}
                </p>
              </div>

              <span className="font-semibold text-green-600">
                {course.progress}%
              </span>
            </div>

            <div className="mt-4 h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-green-600"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            {course.progress < 100 && (
              <Link
                to={`/student/course/${course.id}`}
                className="mt-4 inline-block text-sm font-semibold text-green-600"
              >
                Continue →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearning;
