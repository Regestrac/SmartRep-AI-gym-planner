export type UserProfile = {
  goal: string;
  experience: string;
  days_per_week: number;
  session_length: number;
  equipment: string;
  injuries?: string | null;
  preferred_split: string;
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
