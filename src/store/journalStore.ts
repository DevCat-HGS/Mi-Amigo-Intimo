import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Emotion = 'happy' | 'sad' | 'angry' | 'anxious' | 'calm' | 'excited' | 'grateful';

interface JournalEntry {
  id: string;
  date: string;
  emotion: Emotion;
  intensity: number;
  note: string;
  activities: string[];
}

interface JournalStore {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  getEntriesByDateRange: (startDate: string, endDate: string) => JournalEntry[];
  getEmotionStats: () => { emotion: Emotion; count: number }[];
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            ...state.entries,
            { ...entry, id: crypto.randomUUID() }
          ]
        })),
      getEntriesByDateRange: (startDate, endDate) => {
        const entries = get().entries;
        return entries.filter(
          (entry) => entry.date >= startDate && entry.date <= endDate
        );
      },
      getEmotionStats: () => {
        const entries = get().entries;
        const stats = entries.reduce((acc, entry) => {
          acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
          return acc;
        }, {} as Record<Emotion, number>);
        
        return Object.entries(stats).map(([emotion, count]) => ({
          emotion: emotion as Emotion,
          count
        }));
      }
    }),
    {
      name: 'journal-storage'
    }
  )
);