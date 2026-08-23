import { useState } from "react";
import Chatbox from "./ChatBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import Services from "../sections/Services";
import Plans from "../sections/Plans";
import Contact from "../sections/Contact";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar + Scroll Progress */}
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="
          flex
          min-h-screen
          w-full
          flex-col
          items-center
          justify-center
          gap-8
          bg-zinc-50
          pt-24
        "
      >
        <div className="flex flex-col items-center gap-4 text-center">

          <h1 className="text-4xl font-bold text-zinc-900">
            Your intelligent AI assistant
          </h1>

          <p className="max-w-[560px] text-zinc-600">
            Ask questions, learn new concepts, and get help with anything.
            Powered by the latest in conversational AI.
          </p>

          <div className="flex items-center gap-3">

            {/* Open Assistant */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="
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
              Open Assistant
            </button>

            {/* Learn More */}
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                rounded-xl
                border
                border-zinc-200
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-zinc-700
                transition
                hover:bg-zinc-100
              "
            >
              Learn More
            </button>

          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20">
        <Services />
      </section>

      {/* Plans */}
      <section id="plans" className="scroll-mt-20">
        <Plans />
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />

      {/* Chatbox */}
      {isOpen && (
        <Chatbox onClose={() => setIsOpen(false)} />
      )}

      {/* Floating AI Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
          className="
            fixed
            bottom-6
            right-6
            z-[9999]
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-green-600
            text-2xl
            text-white
            shadow-xl
            shadow-green-600/30
            transition-all
            duration-300
            hover:scale-110
            hover:bg-green-700
            active:scale-95
          "
        >
          ✦
        </button>
      )}
    </>
  );
}

export default Home;