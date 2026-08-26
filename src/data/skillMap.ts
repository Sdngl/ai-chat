import type { SkillRegion } from "../types/skillMap";

export const skillRegions: SkillRegion[] = [
  {
    id: "forest-of-components",
    courseId: "react-fundamentals",
    title: "Forest of Components",
    theme: "Emerald",
    description: "Master React building blocks before the state boss appears.",
    nodes: [
      { id: "react-1", courseId: "react-fundamentals", title: "Introduction", kind: "lesson", xpReward: 40, completed: true },
      { id: "react-2", courseId: "react-fundamentals", title: "Components", kind: "lesson", xpReward: 50, completed: true },
      { id: "react-3", courseId: "react-fundamentals", title: "Props and State", kind: "practice", xpReward: 70, completed: true },
      { id: "react-4", courseId: "react-fundamentals", title: "Event Trial", kind: "lesson", xpReward: 65, completed: false },
      { id: "react-boss", courseId: "react-fundamentals", title: "State Boss Quiz", kind: "boss", xpReward: 160, completed: false },
    ],
  },
  {
    id: "python-harbor",
    courseId: "python-programming",
    title: "Python Harbor",
    theme: "Blue",
    description: "Train clean logic, loops, and functions through short quests.",
    nodes: [
      { id: "python-1", courseId: "python-programming", title: "Python Basics", kind: "lesson", xpReward: 40, completed: true },
      { id: "python-2", courseId: "python-programming", title: "Types Dock", kind: "lesson", xpReward: 50, completed: true },
      { id: "python-3", courseId: "python-programming", title: "Condition Gate", kind: "practice", xpReward: 70, completed: false },
      { id: "python-boss", courseId: "python-programming", title: "Loop Captain", kind: "boss", xpReward: 150, completed: false },
    ],
  },
  {
    id: "database-citadel",
    courseId: "database-management",
    title: "Database Citadel",
    theme: "Amber",
    description: "Unlock SQL paths, joins, keys, and schema strategy.",
    nodes: [
      { id: "db-1", courseId: "database-management", title: "Table Gate", kind: "lesson", xpReward: 45, completed: true },
      { id: "db-2", courseId: "database-management", title: "Select Tower", kind: "lesson", xpReward: 55, completed: false },
      { id: "db-3", courseId: "database-management", title: "Join Bridge", kind: "practice", xpReward: 85, completed: false },
      { id: "db-boss", courseId: "database-management", title: "Schema Boss", kind: "boss", xpReward: 170, completed: false },
    ],
  },
];
