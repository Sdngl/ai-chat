import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { achievementDefinitions } from "../data/achievements";
import { db } from "../firebase/Config";
import type { UserAchievement } from "../types/achievement";
import type { UserProfile } from "../types/user";

export async function getUserAchievements(uid: string) {
  const snapshot = await getDocs(collection(db, "users", uid, "achievements"));

  return snapshot.docs.map((achievementDoc) => ({
    achievementId: achievementDoc.id,
    ...achievementDoc.data(),
  })) as UserAchievement[];
}

export async function checkAndUnlockAchievements(
  uid: string,
  profile: UserProfile
) {
  const existingAchievements = await getUserAchievements(uid);
  const unlockedIds = new Set(
    existingAchievements
      .filter((achievement) => achievement.unlocked)
      .map((achievement) => achievement.achievementId)
  );

  const unlocks = achievementDefinitions.filter(
    (achievement) =>
      !unlockedIds.has(achievement.id) && achievement.condition(profile)
  );

  await Promise.all(
    unlocks.map((achievement) =>
      setDoc(
        doc(db, "users", uid, "achievements", achievement.id),
        {
          achievementId: achievement.id,
          unlocked: true,
          unlockedAt: serverTimestamp(),
        },
        { merge: true }
      )
    )
  );

  return unlocks;
}

export async function unlockAchievement(uid: string, achievementId: string) {
  await setDoc(
    doc(db, "users", uid, "achievements", achievementId),
    {
      achievementId,
      unlocked: true,
      unlockedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
