function Profile() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <p className="mt-2 text-gray-500">
        Manage your personal information.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col items-center border-b border-gray-100 pb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-600">
            S
          </div>

          <h2 className="mt-4 text-xl font-bold">Student</h2>

          <p className="text-sm text-gray-500">
            student@example.com
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Full Name</label>

            <input
              type="text"
              defaultValue="Student"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              defaultValue="student@example.com"
              disabled
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;