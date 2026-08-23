import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const scrollProgress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-20 z-[9999] h-1 w-full">
      <div
        className="h-full w-[3px] bg-green-400 transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;
