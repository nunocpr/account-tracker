import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@lib/utils";
import { cookies, headers } from "next/headers";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/app/_providers/clientProviders";
import Header from "@components/Header/Header.component";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { baseURL } from "./_lib/constants";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const themeCookie = cookies().get("theme");

    if (
        !themeCookie?.value.includes("dark") ||
        !themeCookie?.value.includes("light")
    ) {
        themeCookie?.value === "dark";
    }

    const session = await auth();

    const res = await fetch(baseURL + "/api/mainCategory", {
        method: "GET",
        headers: Object.fromEntries(headers()),
        next: {
            tags: ["mainCategory"],
        },
    });
    const { mainCategories } = await res.json();

    return (
        <html lang="en" className={cn(themeCookie?.value || "dark")}>
            <body
                className={cn(
                    inter.variable,
                    "min-h-screen w-full from-gray-100 to-gray-200 bg-gradient-to-b dark:from-gray-800 dark:to-gray-600"
                )}
            >
                <Providers>
                    <ToastContainer position="top-right" theme="light" />
                    <Header session={session} mainCategories={mainCategories} />
                    <main className="pt-16">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
