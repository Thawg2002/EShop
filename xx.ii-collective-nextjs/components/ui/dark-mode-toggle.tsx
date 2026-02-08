'use client';

import { useEffect, useState } from 'react';
import { useDarkModeStore } from '@/lib/dark-mode-store';
import { SunIcon, MoonIcon } from '@/components/icons';

export function DarkModeToggle() {
    const { isDarkMode, toggle } = useDarkModeStore();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [isDarkMode, mounted]);

    if (!mounted) {
        return (
            <button className="hover:text-black dark:hover:text-white transition-colors">
                <SunIcon />
            </button>
        );
    }

    return (
        <button
            onClick={toggle}
            className="hover:text-black dark:hover:text-white transition-all duration-300"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? (
                <SunIcon className="w-5 h-5 text-[#fdf404] rotate-0 transition-transform duration-300" />
            ) : (
                <MoonIcon className="w-5 h-5 rotate-0 transition-transform duration-300" />
            )}
        </button>
    );
}
