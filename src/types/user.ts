import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  xp: number;
  level: number;
  coins: number;
  streak: number;
  longestStreak: number;
  totalQuizzes: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
  bestScore: number;
  bestCombo: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CreateUserProfileInput {
  uid: string;
  displayName: string;
  email: string | null;
}
