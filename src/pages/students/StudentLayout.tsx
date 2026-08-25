import { NavLink, Outlet } from "react-router-dom";

function StudentLayout() {
  const navItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: "⌂" },
    { name: "Courses", path: "/student/courses", icon: "▣" },
    { name: "My Learning", path: "/student/learning", icon: "◉" },
    { name: "Progress", path: "/student/progress", icon: "↗" },
    { name: "Profile", path: "/student/profile", icon: "○" },
    { name: "Settings", path: "/student/settings", icon: "⚙" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-20 items-center border-b border-gray-100 px-7">
          <h1 className="text-2xl font-bold text-green-600">Learno</h1>
        </div>

        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">
            Need help learning?
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Ask Learno AI for help with your studies.
          </p>

          <button className="mt-3 w-full rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">
            Ask AI
          </button>
        </div>
      </aside>

      <main className="lg:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
          <div>
            <p className="text-sm text-gray-500">Learno</p>
            <h2 className="font-semibold">Student Portal</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
              🔔
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                S
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Student</p>
                <p className="text-xs text-gray-500">Learner</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-5 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;