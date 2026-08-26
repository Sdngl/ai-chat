import type { Quest } from "../../types/companion";

interface QuestListProps {
  quests: Quest[];
}

function QuestList({ quests }: QuestListProps) {
  return (
    <div className="space-y-3">
      {quests.map((quest) => {
        const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));
        const isComplete = quest.progress >= quest.target;

        return (
          <div key={quest.id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{quest.description}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isComplete
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                +{quest.rewardXp} XP
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500">
                {quest.progress}/{quest.target}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuestList;
