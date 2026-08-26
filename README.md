# Learno - AI Chat Learning Platform

An AI-powered learning platform built with React, Vite, and Firebase.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Firebase** for authentication and backend
- **React Router v7** for routing

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
ai-chat/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Static assets (images)
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/          # Reusable UI components
│   │   ├── AiButton.tsx
│   │   ├── ChatBox.tsx
│   │   ├── Footer.tsx
│   │   ├── Home.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── companion/       # Companion-related components
│   │   │   ├── CompanionAvatar.tsx
│   │   │   ├── CompanionCard.tsx
│   │   │   ├── LevelProgress.tsx
│   │   │   └── QuestList.tsx
│   │   └── skill-map/       # Skill map components
│   │       ├── LessonNode.tsx
│   │       ├── SkillMap.tsx
│   │       └── SkillRegion.tsx
│   ├── context/             # React context providers
│   │   ├── AuthContext.tsx
│   │   ├── AuthContextCore.ts
│   │   └── useAuth.ts
│   ├── data/                # Static data and configurations
│   │   ├── achievements.ts
│   │   ├── companion.ts
│   │   ├── courses.ts
│   │   ├── quizQuestions.ts
│   │   └── skillMap.ts
│   ├── firebase/            # Firebase configuration
│   │   └── Config.ts
│   ├── pages/               # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── student/         # Quiz arena pages
│   │   │   ├── QuizArena.tsx
│   │   │   ├── QuizResults.tsx
│   │   │   └── SoloRun.tsx
│   │   └── students/        # Student dashboard pages
│   │       ├── Companion.tsx
│   │       ├── CourseDetails.tsx
│   │       ├── Courses.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Lesson.tsx
│   │       ├── MyLearning.tsx
│   │       ├── Profile.tsx
│   │       ├── Progress.tsx
│   │       ├── Quiz.tsx
│   │       ├── Setting.tsx
│   │       ├── SkillMapPage.tsx
│   │       └── StudentLayout.tsx
│   ├── sections/            # Landing page sections
│   │   ├── Contact.tsx
│   │   ├── Plans.tsx
│   │   └── Services.tsx
│   ├── services/            # Firebase/Firestore service layer
│   │   ├── achievementService.ts
│   │   ├── progressService.ts
│   │   └── userService.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── achievement.ts
│   │   ├── companion.ts
│   │   ├── course.ts
│   │   ├── progress.ts
│   │   ├── skillMap.ts
│   │   └── user.ts
│   ├── utils/               # Utility functions
│   │   ├── companionLogic.ts
│   │   ├── levelLogic.ts
│   │   └── unlockRules.ts
│   ├── App.css
│   ├── App.tsx              # Main app with routes
│   ├── index.css
│   └── main.tsx             # Entry point
├── .env                     # Environment variables (Firebase config)
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- User authentication (Firebase Auth)
- Course browsing and enrollment
- Lesson viewer with progress tracking
- Interactive quiz system with arena mode
- AI companion with leveling and quests
- Skill map visualization
- Student dashboard with progress tracking
- Persistent player progress with Firebase Firestore

## Firestore Progress Persistence // updated

Learno stores player state in Firestore using the existing Firebase app from
`src/firebase/Config.ts`.

Collections and subcollections:

```txt
users/{uid}
users/{uid}/progress/{courseId}
users/{uid}/achievements/{achievementId}
users/{uid}/quizRuns/{runId}
```

`users/{uid}` stores profile and game totals:

```txt
displayName, email, xp, level, coins, streak, longestStreak,
totalQuizzes, totalQuestions, totalCorrectAnswers,
bestScore, bestCombo, createdAt, updatedAt
```

`progress/{courseId}` stores:

```txt
courseId, completedLessons, completedQuizzes, progressPercentage, updatedAt
```

`achievements/{achievementId}` stores:

```txt
achievementId, unlocked, unlockedAt
```

`quizRuns/{runId}` is an idempotency marker so refreshing the results screen
does not duplicate XP, coins, counters, or achievements.

## Firebase Console Setup // updated

1. Enable Firebase Authentication with Email/Password sign-in.
2. Enable Cloud Firestore for the same Firebase project.
3. Confirm `.env` contains the Vite Firebase variables:

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

4. Use development Firestore rules that allow authenticated users to read and
   write only their own document tree, then tighten for production.

Example development rule:

```txt
match /users/{userId}/{document=**} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

## Complete Flow Test // updated

1. Run `npm install` if dependencies are missing.
2. Run `npm run dev`.
3. Register a new account.
4. In Firebase Console, confirm `users/{uid}` was created with XP, level,
   coins, streak, quiz totals, best score, and best combo initial values.
5. Log in and open `/student/arena`.
6. Complete a Solo Run.
7. On the results screen, wait for "Progress saved to your profile."
8. Refresh the results screen and confirm XP/coins are not awarded twice.
9. Open Dashboard, Profile, and Progress to confirm persisted values appear.
10. Open a lesson, click "Mark Complete", then confirm
    `users/{uid}/progress/react-fundamentals` updates in Firestore.
11. Check `users/{uid}/achievements` after quiz milestones such as First Quiz,
    100 Questions, 1,000 XP, and Perfect Score.
