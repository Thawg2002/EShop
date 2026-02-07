import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DarkModeState {
    isDarkMode: boolean;
    toggle: () => void;
    setDarkMode: (value: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>()(
    persist(
        (set) => ({
            isDarkMode: false,
            toggle: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            setDarkMode: (value: boolean) => set({ isDarkMode: value }),
        }),
        {
            name: 'dark-mode-storage',
        }
    )
);
