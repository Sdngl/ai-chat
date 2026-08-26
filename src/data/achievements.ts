import type { AchievementDefinition } from "../types/achievement";

export const achievementDefinitions: AchievementDefinition[] = [
  {
    id: "first-quiz",
    title: "First Quiz",
    description: "Complete your first Solo Run.",
    condition: (profile) => profile.totalQuizzes >= 1,
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Complete 25 quizzes.",
    condition: (profile) => profile.totalQuizzes >= 25,
  },
  {
    id: "seven-day-streak",
    title: "7 Day Streak",
    description: "Keep learning for seven days in a row.",
    condition: (profile) => profile.streak >= 7 || profile.longestStreak >= 7,
  },
  {
    id: "hundred-questions",
    title: "100 Questions",
    description: "Answer 100 quiz questions.",
    condition: (profile) => profile.totalQuestions >= 100,
  },
  {
    id: "thousand-xp",
    title: "1,000 XP",
    description: "Earn 1,000 total XP.",
    condition: (profile) => profile.xp >= 1000,
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Finish a quiz with every answer correct.",
    condition: () => false,
  },
];
