function Plans() {
  return (
    <section
      id="plans"
      className="
        scroll-mt-16
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        gap-10
        bg-white
        px-6
        py-24
      "
    >

      <h2 className="text-3xl font-bold text-zinc-900">
        Plans
      </h2>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8">
          <h3 className="text-xl font-semibold text-zinc-900">
            Free
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            $0
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
            <li>50 messages / day</li>
            <li>Text mode only</li>
            <li>Basic knowledge base</li>
          </ul>
          <button
            type="button"
            className="
              mt-6
              w-full
              rounded-xl
              bg-green-600
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-green-700
            "
          >
            Get Started
          </button>
        </div>

        <div className="rounded-xl border-2 border-green-600 bg-white p-8 shadow-xl">
          <h3 className="text-xl font-semibold text-zinc-900">
            Pro
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            $12
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
            <li>Unlimited messages</li>
            <li>Text & voice modes</li>
            <li>Priority access</li>
          </ul>
          <button
            type="button"
            className="
              mt-6
              w-full
              rounded-xl
              bg-green-600
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-green-700
            "
          >
            Choose Plan
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8">
          <h3 className="text-xl font-semibold text-zinc-900">
            Team
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            $30
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
            <li>For teams up to 10</li>
            <li>Dedicated workspace</li>
            <li>Shared knowledge base</li>
          </ul>
          <button
            type="button"
            className="
              mt-6
              w-full
              rounded-xl
              bg-green-600
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-green-700
            "
          >
            Choose Plan
          </button>
        </div>

      </div>

    </section>
  );
}

export default Plans;
