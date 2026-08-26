import SkillRegion from "./SkillRegion";
import type { SkillRegion as SkillRegionType } from "../../types/skillMap";

interface SkillMapProps {
  regions: SkillRegionType[];
}

function SkillMap({ regions }: SkillMapProps) {
  return (
    <div className="space-y-6">
      {regions.map((region) => (
        <SkillRegion key={region.id} region={region} />
      ))}
    </div>
  );
}

export default SkillMap;
