import type { CompanionMood } from "../../types/companion";

interface CompanionAvatarProps {
  mood: CompanionMood;
  size?: "sm" | "lg";
}

const moodStyles: Record<CompanionMood, string> = {
  proud: "from-green-300 via-emerald-200 to-white text-green-800",
  focused: "from-sky-300 via-cyan-100 to-white text-sky-800",
  lonely: "from-slate-300 via-gray-100 to-white text-gray-700",
  excited: "from-amber-300 via-lime-100 to-white text-amber-800",
};

function CompanionAvatar({ mood, size = "lg" }: CompanionAvatarProps) {
  const dimensions = size === "lg" ? "h-32 w-32" : "h-16 w-16";
  const eyeSize = size === "lg" ? "h-4 w-4" : "h-2.5 w-2.5";

  return (
    <div
      className={`relative flex ${dimensions} shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${moodStyles[mood]} shadow-inner ring-1 ring-black/5`}
      aria-label={`Companion mood: ${mood}`}
    >
      <div className="absolute -top-2 h-7 w-14 rounded-full bg-white/70 blur-sm" />
      <div className="flex gap-4">
        <span className={`${eyeSize} rounded-full bg-current`} />
        <span className={`${eyeSize} rounded-full bg-current`} />
      </div>
      <div className="absolute bottom-9 h-2 w-10 rounded-full bg-current opacity-70" />
    </div>
  );
}

export default CompanionAvatar;
