function Progress() {
  const courses = [
    ["React Fundamentals", 72],
    ["Python Programming", 45],
    ["Database Management", 28],
    ["HTML & CSS", 100],
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">My Progress</h1>

      <p className="mt-2 text-gray-500">
        Track your learning progress and achievements.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["72%", "Overall Progress"],
          ["24.5h", "Learning Time"],
          ["18", "Lessons Completed"],
          ["7", "Day Streak"],
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
          {courses.map(([name, progress]) => (
            <div key={name}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{name}</span>
                <span className="text-gray-500">{progress}%</span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;