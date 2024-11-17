import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type AITone = 'friendly' | 'professional' | 'empathetic' | 'motivational';

interface SettingsStore {
  theme: Theme;
  notifications: boolean;
  soundEnabled: boolean;
  aiResponseTone: AITone;
  toggleTheme: () => void;
  toggleNotifications: () => void;
  toggleSound: () => void;
  setAITone: (tone: AITone) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'light',
      notifications: true,
      soundEnabled: true,
      aiResponseTone: 'friendly',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleNotifications: () =>
        set((state) => ({ notifications: !state.notifications })),
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      setAITone: (tone) => set({ aiResponseTone: tone }),
    }),
    {
      name: 'settings-storage',
    }
  )
);