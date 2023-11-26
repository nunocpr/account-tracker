"use client";

export function getNav() {
    return [
        {
            name: "Dashboard",
            href: "/dashboard",
            type: "button",
            children: getDashboardNav(),
            current: "dashboard",
        },
        // { name: 'Derpboard', href: '/derpboard', current: 'derpboard' },
    ];
}

export function getDashboardNav() {
    return [
        {
            name: "Summary Overview",
            href: "/dashboard/overview",
            current: "overview",
        },
        {
            name: "Transaction History",
            href: "/dashboard/history",
            current: "history",
        },
        { name: "Income", href: "/dashboard/income", current: "income" },
        { name: "Expenses", href: "/dashboard/expenses", current: "expenses" },
        {
            name: "Budget Tracking",
            href: "/dashboard/tracking",
            current: "tracking",
        },
        { name: "Financial Goals", href: "/dashboard/goals", current: "goals" },
        {
            name: "Reports and Insights",
            href: "/dashboard/reports",
            current: "reports",
        },
    ];
}
