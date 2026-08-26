export type SkillNodeKind = "lesson" | "practice" | "boss";

export interface SkillNode {
  id: string;
  courseId: string;
  title: string;
  kind: SkillNodeKind;
  xpReward: number;
  completed: boolean;
}

export interface SkillRegion {
  id: string;
  courseId: string;
  title: string;
  theme: string;
  description: string;
  nodes: SkillNode[];
}
