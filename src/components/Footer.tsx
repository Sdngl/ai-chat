function Footer() {
  return (
    <footer
      className="
        flex
        h-16
        w-full
        items-center
        justify-between
        bg-white
        px-6
        ring-1
        ring-zinc-200
      "
    >

      {/* Logo */}
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-green-600
            text-lg
            font-bold
            text-white
          "
        >
          ✦
        </div>

        <span className="text-xl font-semibold text-zinc-900">
          Learno
        </span>

      </div>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm font-medium text-zinc-600">

        <a
          href="#contact"
          className="transition hover:text-green-700"
        >
          Contact us
        </a>

        <a
          href="#help"
          className="transition hover:text-green-700"
        >
          Help
        </a>

        <span className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Learno
        </span>

      </div>

      {/* Social */}
      <div className="flex items-center gap-3">

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-sm
            font-bold
            text-green-700
            transition
            hover:bg-green-600
            hover:text-white
          "
        >
          𝕏
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-sm
            font-bold
            text-green-700
            transition
            hover:bg-green-600
            hover:text-white
          "
        >
          ★
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-sm
            font-bold
            text-green-700
            transition
            hover:bg-green-600
            hover:text-white
          "
        >
          in
        </a>

      </div>

    </footer>
  );
}

export default Footer;
