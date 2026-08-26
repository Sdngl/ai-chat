import { Link } from "react-router-dom";

import CompanionAvatar from "./CompanionAvatar";
import LevelProgress from "./LevelProgress";
import { getMoodLabel } from "../../utils/companionLogic";
import type { CompanionState } from "../../types/companion";

interface CompanionCardProps {
  companion: CompanionState;
  compact?: boolean;
}

function CompanionCard({ companion, compact = false }: CompanionCardProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <CompanionAvatar mood={companion.mood} size={compact ? "sm" : "lg"} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-green-600">AI COMPANION</p>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {getMoodLabel(companion.mood)}
            </span>
          </div>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">{companion.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{companion.species}</p>
          <p className="mt-4 text-sm leading-6 text-gray-600">{companion.message}</p>

          <div className="mt-5">
            <LevelProgress companion={companion} />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/student/companion"
              className="rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Visit Companion
            </Link>
            <Link
              to="/student/map"
              className="rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Open Skill Map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanionCard;
