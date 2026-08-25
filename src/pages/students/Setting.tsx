function Settings() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">Settings</h1>

      <p className="mt-2 text-gray-500">
        Manage your Learno preferences.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-bold">Notifications</h2>

          <label className="mt-4 flex items-center justify-between">
            <span>
              <span className="block text-sm font-medium">
                Course notifications
              </span>

              <span className="text-xs text-gray-500">
                Receive updates about your courses.
              </span>
            </span>

            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-bold">Account</h2>

          <button className="mt-4 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;