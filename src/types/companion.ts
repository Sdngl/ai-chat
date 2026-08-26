export type CompanionMood = "proud" | "focused" | "lonely" | "excited";

export interface CompanionState {
  name: string;
  species: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  mood: CompanionMood;
  streak: number;
  message: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  rewardXp: number;
}
