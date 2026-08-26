import CompanionCard from "../../components/companion/CompanionCard";
import QuestList from "../../components/companion/QuestList";
import { companionState, dailyQuests } from "../../data/companion";

function Companion() {
  return (
    <div className="space-y-8">
      <CompanionCard companion={companionState} />

      <section>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-green-600">DAILY QUESTS</p>
            <h1 className="mt-1 text-3xl font-bold">Train with Nimo</h1>
            <p className="mt-2 text-gray-500">
              Finish quests to grow your companion as your learning progress grows.
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
            <p className="text-sm text-green-700">Current streak</p>
            <p className="text-2xl font-bold text-green-800">
              {companionState.streak} days
            </p>
          </div>
        </div>

        <div className="mt-5">
          <QuestList quests={dailyQuests} />
        </div>
      </section>
    </div>
  );
}

export default Companion;
