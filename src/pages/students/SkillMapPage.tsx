import SkillMap from "../../components/skill-map/SkillMap";
import { skillRegions } from "../../data/skillMap";

function SkillMapPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-green-600 p-6 text-white sm:p-8">
        <p className="text-sm font-semibold text-green-100">ADVENTURE MODE</p>
        <h1 className="mt-2 text-3xl font-bold">Skill Map</h1>
        <p className="mt-3 max-w-2xl text-green-50">
          Move through lesson nodes, unlock practice trials, and finish each
          region with a boss quiz.
        </p>
      </section>

      <SkillMap regions={skillRegions} />
    </div>
  );
}

export default SkillMapPage;
