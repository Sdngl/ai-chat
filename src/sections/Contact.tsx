function Contact() {
  return (
    <section
      id="contact"
      className="
        scroll-mt-16
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        gap-10
        bg-zinc-50
        px-6
        py-24
      "
    >

      <h2 className="text-3xl font-bold text-zinc-900">
        Contact
      </h2>

      <form
        className="
          flex
          w-full
          max-w-lg
          flex-col
          gap-4
        "
      >

        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-zinc-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-zinc-800
              outline-none
              placeholder:text-zinc-400
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-zinc-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-zinc-800
              outline-none
              placeholder:text-zinc-400
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-zinc-700"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="How can we help?"
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-zinc-800
              outline-none
              placeholder:text-zinc-400
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          />
        </div>

        <button
          type="submit"
          className="
            self-start
            rounded-xl
            bg-green-600
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-green-700
          "
        >
          Send Message
        </button>

      </form>

    </section>
  );
}

export default Contact;
