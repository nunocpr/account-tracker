/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ["class"],
    theme: {
        extend: {
            fontFamily: {
                default: ["var(--font-inter)"],
            },
            animation: {
                "spin-slow": "spin 4s linear infinite",
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar"),
        require("@tailwindcss/container-queries"),
        require("@tailwindcss/forms"),
        require("@headlessui/tailwindcss"),
    ],
};
