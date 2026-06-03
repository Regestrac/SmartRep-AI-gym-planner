export type User = {
  id: string;
  email: string;
  createdAt: string;
};

export type UserProfile = {
  userId: string;
  goal: "cut" | "bulk" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbbells";
  injuries?: string;
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
  updatedAt: string;
};

export type PlanOverview = {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
};

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
};

export type DaySchedule = {
  day: string;
  focus: string;
  exercises: Exercise[];
};

export type TrainingPlan = {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
};
