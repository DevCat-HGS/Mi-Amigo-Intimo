import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  completed: boolean;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface GoalsStore {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'progress' | 'completed'>) => void;
  updateProgress: (goalId: string, progress: number) => void;
  completeMilestone: (goalId: string, milestoneId: string) => void;
  deleteGoal: (goalId: string) => void;
}

export const useGoalsStore = create<GoalsStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goal,
              id: crypto.randomUUID(),
              progress: 0,
              completed: false
            }
          ]
        })),
      updateProgress: (goalId, progress) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  progress,
                  completed: progress === 100
                }
              : goal
          )
        })),
      completeMilestone: (goalId, milestoneId) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  milestones: goal.milestones.map((milestone) =>
                    milestone.id === milestoneId
                      ? { ...milestone, completed: true }
                      : milestone
                  ),
                  progress:
                    (goal.milestones.filter((m) => m.completed || m.id === milestoneId).length /
                      goal.milestones.length) *
                    100
                }
              : goal
          )
        })),
      deleteGoal: (goalId) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== goalId)
        }))
    }),
    {
      name: 'goals-storage'
    }
  )
);