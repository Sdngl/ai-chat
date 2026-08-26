import type { Timestamp } from "firebase/firestore";
import type { UserProfile } from "./user";

export type AchievementCondition = (profile: UserProfile) => boolean;

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  condition: AchievementCondition;
}

export interface UserAchievement {
  achievementId: string;
  unlocked: boolean;
  unlockedAt?: Timestamp;
}
