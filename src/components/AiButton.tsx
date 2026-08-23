import { useState } from "react";
import Chatbox from "./ChatBox";

function AIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          <span className="text-2xl">
            ✦
          </span>
        </button>
      )}
    </>
  );
}

export default AIButton;