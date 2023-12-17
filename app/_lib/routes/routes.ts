"use client";

export enum EnumPageStatus {
    // eslint-disable-next-line no-unused-vars
    Soon = "soon",
    // eslint-disable-next-line no-unused-vars
    Live = "live",
}

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
            status: EnumPageStatus.Live,
        },
        {
            name: "Transaction History",
            href: "/dashboard/history",
            current: "history",
            status: EnumPageStatus.Soon,
        },
        {
            name: "Income",
            href: "/dashboard/income",
            current: "income",
            status: EnumPageStatus.Soon,
        },
        {
            name: "Expenses",
            href: "/dashboard/expenses",
            current: "expenses",
            status: EnumPageStatus.Soon,
        },
        {
            name: "Budget Tracking",
            href: "/dashboard/tracking",
            current: "tracking",
            status: EnumPageStatus.Soon,
        },
        {
            name: "Financial Goals",
            href: "/dashboard/goals",
            current: "goals",
            status: EnumPageStatus.Soon,
        },
        {
            name: "Reports and Insights",
            href: "/dashboard/reports",
            current: "reports",
            status: EnumPageStatus.Soon,
        },
    ];
}
