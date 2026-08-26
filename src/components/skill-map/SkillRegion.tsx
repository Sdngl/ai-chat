import LessonNode from "./LessonNode";
import { getRegionProgress, isNodeUnlocked } from "../../utils/unlockRules";
import type { SkillRegion as SkillRegionType } from "../../types/skillMap";

interface SkillRegionProps {
  region: SkillRegionType;
}

function SkillRegion({ region }: SkillRegionProps) {
  const progress = getRegionProgress(region.nodes);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-gray-50 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-green-600">{region.theme} Region</p>
            <h2 className="mt-1 text-2xl font-bold">{region.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-500">{region.description}</p>
          </div>

          <div className="min-w-36">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Region</span>
              <span className="font-semibold text-green-700">{progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-green-600" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 p-5 md:grid-cols-5">
        {region.nodes.map((node, index) => (
          <LessonNode
            key={node.id}
            node={node}
            index={index}
            unlocked={isNodeUnlocked(region.nodes, index)}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillRegion;
