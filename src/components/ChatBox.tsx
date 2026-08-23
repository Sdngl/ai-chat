import { useRef, useState } from "react";

interface ChatboxProps {
  onClose: () => void;
}

function Chatbox({ onClose }: ChatboxProps) {
  const [mode, setMode] = useState<"text" | "voice">("text");

  const [position, setPosition] = useState({
    x: window.innerWidth - 400,
    y: window.innerHeight - 600,
  });

  const dragging = useRef(false);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    dragging.current = true;

    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    const chatWidth = 370;
    const chatHeight = 540;

    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;

    const maxX = window.innerWidth - chatWidth;
    const maxY = window.innerHeight - chatHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
      }}
      className="
        flex
        h-[540px]
        w-[370px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-zinc-200
        bg-white
        shadow-2xl
      "
    >

      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="
          flex
          h-7
          shrink-0
          cursor-grab
          select-none
          items-center
          justify-center
          bg-green-50
          active:cursor-grabbing
        "
      >
        <div
          className="
            h-1
            w-10
            rounded-full
            bg-green-300
            transition-colors
            hover:bg-green-400
          "
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between bg-green-600 px-5 py-4 text-white">

        <div className="flex items-center gap-3">

          {/* AI Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
            ✦
          </div>

          <div>
            <h3 className="font-semibold">
              AI Assistant
            </h3>

            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-200" />

              <span className="text-xs text-green-100">
                Online
              </span>
            </div>
          </div>

        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close AI assistant"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-xl
            text-white/80
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          ×
        </button>

      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-zinc-50">

        {/* ================= TEXT MODE ================= */}

        {mode === "text" && (
          <>
            {/* Messages */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">

              {/* AI Message */}
              <div className="flex items-start gap-2">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm text-green-600">
                  ✦
                </div>

                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">

                  <p className="text-sm leading-6 text-zinc-700">
                    Hello! 👋
                  </p>

                  <p className="mt-1 text-sm leading-6 text-zinc-700">
                    How can I help you today?
                  </p>

                </div>

              </div>

              {/* Suggestions */}
              <div className="mt-auto">

                <p className="mb-2 text-xs text-zinc-400">
                  Try asking
                </p>

                <div className="flex flex-col gap-2">

                  <button
                    type="button"
                    className="
                      rounded-xl
                      border
                      border-zinc-200
                      bg-white
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      text-zinc-600
                      transition
                      hover:border-green-300
                      hover:bg-green-50
                      hover:text-green-700
                    "
                  >
                    What can you help me with?
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-xl
                      border
                      border-zinc-200
                      bg-white
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      text-zinc-600
                      transition
                      hover:border-green-300
                      hover:bg-green-50
                      hover:text-green-700
                    "
                  >
                    Explain something to me
                  </button>

                </div>

              </div>

            </div>

            {/* Input */}
            <div className="border-t border-zinc-200 bg-white p-3">

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  p-1.5
                  transition
                  focus-within:border-green-500
                  focus-within:ring-2
                  focus-within:ring-green-100
                "
              >

                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    py-2
                    text-sm
                    text-zinc-800
                    outline-none
                    placeholder:text-zinc-400
                  "
                />

                <button
                  type="button"
                  aria-label="Send message"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-600
                    text-white
                    transition
                    hover:bg-green-700
                  "
                >
                  ↑
                </button>

              </div>

            </div>
          </>
        )}

        {/* ================= VOICE MODE ================= */}

        {mode === "voice" && (
          <div className="flex flex-1 flex-col items-center justify-center px-6">

            {/* AI Orb */}
            <div className="relative flex h-36 w-36 items-center justify-center">

              <div
                className="
                  absolute
                  inset-0
                  animate-pulse
                  rounded-full
                  bg-green-200
                  opacity-60
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-green-600
                  text-4xl
                  text-white
                  shadow-xl
                  shadow-green-600/30
                "
              >
                ✦
              </div>

            </div>

            <h3 className="mt-6 text-lg font-semibold text-zinc-800">
              Ready to listen
            </h3>

            <p className="mt-2 max-w-[250px] text-center text-sm leading-6 text-zinc-500">
              Tap the microphone to start talking with your AI assistant.
            </p>

            {/* Microphone */}
            <button
              type="button"
              aria-label="Start voice conversation"
              className="
                mt-8
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-green-600
                text-2xl
                text-white
                shadow-lg
                shadow-green-600/30
                transition
                hover:scale-105
                hover:bg-green-700
                active:scale-95
              "
            >
              🎙
            </button>

          </div>
        )}

      </div>

      {/* Mode Switcher */}
      <div className="border-t border-zinc-200 bg-white p-3">

        <div className="flex rounded-xl bg-zinc-100 p-1">

          {/* Text */}
          <button
            type="button"
            onClick={() => setMode("text")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              py-2.5
              text-sm
              font-medium
              transition
              ${
                mode === "text"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }
            `}
          >
            <span>💬</span>
            Text
          </button>

          {/* Voice */}
          <button
            type="button"
            onClick={() => setMode("voice")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              py-2.5
              text-sm
              font-medium
              transition
              ${
                mode === "voice"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }
            `}
          >
            <span>🎙</span>
            Voice
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chatbox;