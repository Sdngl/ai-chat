import { Link } from "react-router-dom";

import type { SkillNode } from "../../types/skillMap";

interface LessonNodeProps {
  node: SkillNode;
  index: number;
  unlocked: boolean;
}

function LessonNode({ node, index, unlocked }: LessonNodeProps) {
  const isBoss = node.kind === "boss";
  const content = (
    <div
      className={`relative flex min-h-28 items-center gap-4 rounded-2xl border p-4 transition ${
        node.completed
          ? "border-green-200 bg-green-50"
          : unlocked
            ? "border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"
            : "border-gray-200 bg-gray-100 opacity-70"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          isBoss
            ? "bg-red-600 text-white"
            : node.completed
              ? "bg-green-600 text-white"
              : unlocked
                ? "bg-white text-green-700 ring-2 ring-green-100"
                : "bg-gray-200 text-gray-500"
        }`}
      >
        {node.completed ? "OK" : isBoss ? "B" : index + 1}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-gray-500">
          {node.kind} quest
        </p>
        <h3 className="mt-1 font-bold text-gray-900">{node.title}</h3>
        <p className="mt-1 text-sm text-gray-500">Reward: {node.xpReward} XP</p>
      </div>
    </div>
  );

  if (!unlocked) {
    return content;
  }

  return (
    <Link
      to={isBoss ? "/student/arena" : `/student/lesson/${index + 1}`}
      className="block"
    >
      {content}
    </Link>
  );
}

export default LessonNode;
