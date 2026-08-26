import type { CompanionState, Quest } from "../types/companion";

export const companionState: CompanionState = {
  name: "Nimo",
  species: "AI Mentorling",
  level: 8,
  xp: 640,
  nextLevelXp: 900,
  mood: "proud",
  streak: 7,
  message:
    "You are building momentum. Clear one more React node and I can upgrade your study plan.",
};

export const dailyQuests: Quest[] = [
  {
    id: "react-lessons",
    title: "Clear 3 React lessons",
    description: "Continue the React region on your skill map.",
    progress: 2,
    target: 3,
    rewardXp: 120,
  },
  {
    id: "arena-run",
    title: "Win one quiz run",
    description: "Finish a Solo Run with at least 70% accuracy.",
    progress: 0,
    target: 1,
    rewardXp: 90,
  },
  {
    id: "streak",
    title: "Protect the streak",
    description: "Complete any lesson today.",
    progress: 1,
    target: 1,
    rewardXp: 60,
  },
];
