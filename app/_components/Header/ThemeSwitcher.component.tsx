"use client";
import { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export enum Theme {
    dark = "dark",
    light = "light",
}

export default function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.dark);

    const toggleTheme = () => {
        const newTheme = currentTheme === Theme.dark ? Theme.light : Theme.dark;

        document.documentElement.classList.remove(currentTheme);
        document.documentElement.classList.add(newTheme);

        setCurrentTheme(newTheme);
        document.cookie = `theme=${newTheme}; path=/; sameSite=lax; secure=${
            process.env.NODE_ENV === "production"
        }`;
    };

    return (
        <button
            className="ml-4 p-1 rounded-full cursor-pointer dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-gray-800 hover:animate-spin-slow"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {currentTheme === Theme.dark ? (
                <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
                <MoonIcon className="w-6 h-6 text-gray-400" />
            )}
        </button>
    );
}
