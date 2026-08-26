export const xpPerLevel = 500;

export function getLevelFromXp(xp: number) {
  return Math.floor(Math.max(0, xp) / xpPerLevel) + 1;
}

export function getXpForLevel(level: number) {
  return Math.max(0, level - 1) * xpPerLevel;
}

export function getNextLevelXp(level: number) {
  return level * xpPerLevel;
}
