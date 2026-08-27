import type { Timestamp } from "firebase/firestore";
import type { QuizTopic } from "../data/quizQuestions";

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  progressPercentage: number;
  updatedAt?: Timestamp;
}

export interface SoloRunResult {
  runId: string;
  topic: QuizTopic;
  status: "completed" | "game_over";
  score: number;
  correct: number;
  wrong: number;
  total: number;
  bestCombo: number;
  xp: number;
  coins: number;
}
