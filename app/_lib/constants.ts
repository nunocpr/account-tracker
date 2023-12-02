export const baseURL =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL
        : "http://localhost:3000";

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
