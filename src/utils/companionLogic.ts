import type { CompanionMood, CompanionState } from "../types/companion";

export function getCompanionXpPercent(companion: CompanionState) {
  return Math.min(100, Math.round((companion.xp / companion.nextLevelXp) * 100));
}

export function getMoodLabel(mood: CompanionMood) {
  const labels: Record<CompanionMood, string> = {
    proud: "Proud",
    focused: "Focused",
    lonely: "Missing you",
    excited: "Excited",
  };

  return labels[mood];
}
