function Services() {
  return (
    <section
      id="services"
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
        Services
      </h2>

      <div className="flex w-full max-w-4xl flex-col gap-6">

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="mb-1 text-lg font-semibold text-zinc-900">
            AI Chat Assistant
          </h3>
          <p className="text-sm text-zinc-600">
            A smart conversational agent that answers questions, writes code,
            and helps brainstorm ideas in real time.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="mb-1 text-lg font-semibold text-zinc-900">
            Voice Mode
          </h3>
          <p className="text-sm text-zinc-600">
            Speak naturally and be heard. Our voice-powered assistant
            understands intent and responds with clarity.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="mb-1 text-lg font-semibold text-zinc-900">
            Knowledge Base
          </h3>
          <p className="text-sm text-zinc-600">
            Access curated learning resources, tutorials, and documentation
            tailored to your goals.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Services;
