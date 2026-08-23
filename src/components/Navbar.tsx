import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState<string>("Home");
  const [language, setLanguage] = useState("EN");
  const [languageOpen, setLanguageOpen] = useState(false);

  const navigate = useNavigate();

  // Navbar order
  const links = [
    { label: "Services", href: "#services" },
    { label: "Plans", href: "#plans" },
    { label: "Contact", href: "#contact" },
  ];

  // Active section detection
  useEffect(() => {
    const sections = [
      { label: "Home", id: "home" },
      { label: "Services", id: "services" },
      { label: "Plans", id: "plans" },
      { label: "Contact", id: "contact" },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      let currentSection = "Home";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);

        if (!element) return;

        if (element.offsetTop <= scrollPosition) {
          currentSection = section.label;
        }
      });

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "NP", name: "नेपाली", flag: "🇳🇵" },
    { code: "HI", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const selectedLanguage = languages.find(
    (lang) => lang.code === language
  );

  return (
    <nav
      className="
        fixed
        top-0
        z-40
        flex
        h-20
        w-full
        items-center
        justify-between
        bg-white/80
        px-6
        pb-3
        pt-4
        backdrop-blur
        ring-1
        ring-zinc-200
      "
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={() => navigate("/")}
        className="
          group
          flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          p-1
          transition
          hover:bg-green-50
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-green-600
            text-xl
            font-bold
            text-white
          "
        >
          ✦
        </div>

        <span
          className="
            text-2xl
            font-semibold
            text-zinc-900
            transition-shadow
            duration-300
            group-hover:animate-radiant-shine
          "
        >
          Learno
        </span>
      </a>

      {/* Navigation Links */}
      <div className="flex items-center gap-1">

        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`
              rounded-lg
              px-4
              py-2
              text-base
              font-medium
              underline-offset-4
              decoration-green-600
              transition
              ${
                active === link.label
                  ? "bg-green-50 text-green-600 underline decoration-2"
                  : "text-zinc-600 hover:text-green-700 hover:underline hover:decoration-2"
              }
            `}
          >
            {link.label}
          </a>
        ))}

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Language */}
        <div className="relative">

          <button
            type="button"
            onClick={() => setLanguageOpen((prev) => !prev)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-3
              py-2.5
              text-sm
              font-medium
              text-zinc-700
              transition
              hover:border-green-300
              hover:bg-green-50
            "
          >
            <span>🌐</span>

            <span>
              {selectedLanguage?.code}
            </span>

            <span
              className={`text-xs transition-transform ${
                languageOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Dropdown */}
          {languageOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                w-44
                overflow-hidden
                rounded-xl
                border
                border-zinc-200
                bg-white
                p-1
                shadow-xl
              "
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setLanguageOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    transition
                    ${
                      language === lang.code
                        ? "bg-green-50 text-green-700"
                        : "text-zinc-600 hover:bg-zinc-50"
                    }
                  `}
                >
                  <span>{lang.flag}</span>

                  <span>{lang.name}</span>

                  {language === lang.code && (
                    <span className="ml-auto text-green-600">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

        </div>

      {/* Get Started */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="
          btn-fill-left
          rounded-xl
          px-5
          py-2.5
          text-sm
          font-medium
          transition-colors
        "
      >
        Get Started
      </button>

      </div>
    </nav>
  );
}

export default Navbar;