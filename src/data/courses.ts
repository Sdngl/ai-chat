import type { Course } from "../types/course";

export const courses: Course[] = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    category: "Web Development",
    level: "Beginner",
    students: 1240,
    progress: 72,
    description:
      "Learn the fundamentals of React and build modern interactive web applications.",
    lessons: [
      { id: "react-1", title: "Introduction", duration: "8 min", completed: true },
      {
        id: "react-2",
        title: "Understanding Components",
        duration: "12 min",
        completed: true,
      },
      { id: "react-3", title: "Props and State", duration: "16 min", completed: true },
      { id: "react-4", title: "Event Handling", duration: "14 min", completed: false },
      { id: "react-5", title: "Working with Forms", duration: "18 min", completed: false },
      { id: "react-6", title: "Final Project", duration: "35 min", completed: false },
    ],
  },
  {
    id: "python-programming",
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    students: 980,
    progress: 45,
    description:
      "Practice Python syntax, functions, loops, and problem solving with guided lessons.",
    lessons: [
      { id: "python-1", title: "Python Basics", duration: "10 min", completed: true },
      { id: "python-2", title: "Variables and Types", duration: "12 min", completed: true },
      { id: "python-3", title: "Conditionals", duration: "14 min", completed: false },
      { id: "python-4", title: "Loops", duration: "16 min", completed: false },
      { id: "python-5", title: "Functions", duration: "18 min", completed: false },
    ],
  },
  {
    id: "database-management",
    title: "Database Management",
    category: "Database",
    level: "Intermediate",
    students: 760,
    progress: 28,
    description:
      "Understand tables, keys, SQL queries, relationships, and practical database design.",
    lessons: [
      { id: "db-1", title: "Relational Thinking", duration: "11 min", completed: true },
      { id: "db-2", title: "SQL Selects", duration: "15 min", completed: false },
      { id: "db-3", title: "Joins", duration: "20 min", completed: false },
      { id: "db-4", title: "Indexes", duration: "18 min", completed: false },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Essentials",
    category: "Web Development",
    level: "Intermediate",
    students: 850,
    progress: 34,
    description:
      "Build confidence with arrays, objects, async code, browser APIs, and modern syntax.",
    lessons: [
      { id: "js-1", title: "Language Basics", duration: "9 min", completed: true },
      { id: "js-2", title: "Arrays and Objects", duration: "17 min", completed: false },
      { id: "js-3", title: "Async JavaScript", duration: "22 min", completed: false },
      { id: "js-4", title: "DOM Practice", duration: "18 min", completed: false },
    ],
  },
];

export function getCourseById(id: string | undefined) {
  return courses.find((course) => course.id === id) ?? courses[0];
}
