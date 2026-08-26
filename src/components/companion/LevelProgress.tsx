import { getCompanionXpPercent } from "../../utils/companionLogic";
import type { CompanionState } from "../../types/companion";

interface LevelProgressProps {
  companion: CompanionState;
}

function LevelProgress({ companion }: LevelProgressProps) {
  const xpPercent = getCompanionXpPercent(companion);

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-700">Level {companion.level}</span>
        <span className="text-gray-500">
          {companion.xp}/{companion.nextLevelXp} XP
        </span>
      </div>

      <div className="mt-2 h-3 rounded-full bg-gray-100">
        <div
          className="h-3 rounded-full bg-green-600 transition-all"
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </div>
  );
}

export default LevelProgress;
