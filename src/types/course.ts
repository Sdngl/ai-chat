export interface LessonSummary {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: LessonSummary[];
  students: number;
  progress: number;
  description: string;
}
