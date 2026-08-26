import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/Config";
import { courses } from "../data/courses";
import { getLevelFromXp } from "../utils/levelLogic";
import {
  checkAndUnlockAchievements,
  unlockAchievement,
} from "./achievementService";
import { initialGameStats } from "./userService";
import type { CourseProgress, SoloRunResult } from "../types/progress";
import type { UserProfile } from "../types/user";

export function getCourseProgressRef(uid: string, courseId: string) {
  return doc(db, "users", uid, "progress", courseId);
}

export async function getCourseProgress(uid: string, courseId: string) {
  const snapshot = await getDoc(getCourseProgressRef(uid, courseId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as CourseProgress;
}

export async function markLessonCompleted(
  uid: string,
  courseId: string,
  lessonId: string
) {
  const course = courses.find((item) => item.id === courseId);
  const currentProgress = await getCourseProgress(uid, courseId);
  const completedLessons = new Set(currentProgress?.completedLessons ?? []);
  completedLessons.add(lessonId);

  const lessonCount = course?.lessons.length ?? completedLessons.size;
  const progressPercentage = Math.min(
    100,
    Math.round((completedLessons.size / lessonCount) * 100)
  );

  await setDoc(
    getCourseProgressRef(uid, courseId),
    {
      courseId,
      completedLessons: Array.from(completedLessons),
      completedQuizzes: currentProgress?.completedQuizzes ?? [],
      progressPercentage,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function markCourseQuizCompleted(
  uid: string,
  courseId: string,
  quizId: string
) {
  await setDoc(
    getCourseProgressRef(uid, courseId),
    {
      courseId,
      completedQuizzes: arrayUnion(quizId),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function completeSoloRun(uid: string, result: SoloRunResult) {
  const userRef = doc(db, "users", uid);
  const runRef = doc(db, "users", uid, "quizRuns", result.runId);

  const updatedProfile = await runTransaction(db, async (transaction) => {
    const runSnapshot = await transaction.get(runRef);

    if (runSnapshot.exists()) {
      return null;
    }

    const userSnapshot = await transaction.get(userRef);

    if (!userSnapshot.exists()) {
      throw new Error("User profile does not exist.");
    }

    const profile = {
      ...initialGameStats,
      uid,
      ...userSnapshot.data(),
    } as UserProfile;

    const nextXp = profile.xp + result.xp;
    const nextLevel = getLevelFromXp(nextXp);
    const nextBestScore = Math.max(profile.bestScore, result.score);
    const nextBestCombo = Math.max(profile.bestCombo, result.bestCombo);

    transaction.set(runRef, {
      ...result,
      processedAt: serverTimestamp(),
    });

    transaction.update(userRef, {
      xp: increment(result.xp),
      coins: increment(result.coins),
      totalQuizzes: increment(1),
      totalQuestions: increment(result.total),
      totalCorrectAnswers: increment(result.correct),
      level: nextLevel,
      bestScore: nextBestScore,
      bestCombo: nextBestCombo,
      updatedAt: serverTimestamp(),
    });

    return {
      ...profile,
      xp: nextXp,
      level: nextLevel,
      coins: profile.coins + result.coins,
      totalQuizzes: profile.totalQuizzes + 1,
      totalQuestions: profile.totalQuestions + result.total,
      totalCorrectAnswers: profile.totalCorrectAnswers + result.correct,
      bestScore: nextBestScore,
      bestCombo: nextBestCombo,
    };
  });

  if (updatedProfile) {
    await checkAndUnlockAchievements(uid, updatedProfile);

    if (result.correct === result.total) {
      await unlockAchievement(uid, "perfect-score");
    }
  }

  return updatedProfile;
}
