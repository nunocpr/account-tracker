export const baseURL =
    process.env.NODE_ENV === "production"
        ? process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
        : process.env.NEXT_PUBLIC_BASE_URL;

export const baseCategories = [
    "Food",
    "Utilities",
    "Housing",
    "Transportation",
    "Dining",
    "Entertainment",
    "Health",
    "Insurance",
    "Education",
    "Personal Care",
];
