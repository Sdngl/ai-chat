import type { SkillNode } from "../types/skillMap";

export function isNodeUnlocked(nodes: SkillNode[], index: number) {
  if (index === 0) {
    return true;
  }

  return nodes[index - 1]?.completed ?? false;
}

export function getRegionProgress(nodes: SkillNode[]) {
  const completed = nodes.filter((node) => node.completed).length;
  return Math.round((completed / nodes.length) * 100);
}
