import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "../firebase/Config";
import type { CreateUserProfileInput, UserProfile } from "../types/user";

export const initialGameStats = {
  xp: 0,
  level: 1,
  coins: 0,
  streak: 0,
  longestStreak: 0,
  totalQuizzes: 0,
  totalQuestions: 0,
  totalCorrectAnswers: 0,
  bestScore: 0,
  bestCombo: 0,
};

export function getUserRef(uid: string) {
  return doc(db, "users", uid);
}

export async function createUserProfileIfMissing(input: CreateUserProfileInput) {
  const userRef = getUserRef(input.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return {
      ...initialGameStats,
      uid: input.uid,
      ...snapshot.data(),
    } as UserProfile;
  }

  const profile = {
    displayName: input.displayName,
    email: input.email ?? "",
    ...initialGameStats,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);

  return {
    ...profile,
    uid: input.uid,
  } as UserProfile;
}

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(getUserRef(uid));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    ...initialGameStats,
    uid,
    ...snapshot.data(),
  } as UserProfile;
}

export function subscribeUserProfile(
  uid: string,
  onChange: (profile: UserProfile | null) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    getUserRef(uid),
    (snapshot) => {
      if (!snapshot.exists()) {
        onChange(null);
        return;
      }

      onChange({
        ...initialGameStats,
        uid,
        ...snapshot.data(),
      } as UserProfile);
    },
    onError
  );
}
