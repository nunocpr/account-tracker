import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@lib/utils";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "@/app/clientProviders";
import Header from "./_components/Header/Header.component";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const themeCookie = cookies().get("theme");

    if (
        !themeCookie?.value.includes("dark") ||
        !themeCookie?.value.includes("light")
    ) {
        themeCookie?.value === "dark";
    }

    const session = await getServerSession(authOptions);

    return (
        <html lang="en" className={cn(themeCookie?.value || "dark")}>
            <body
                className={cn(
                    inter.variable,
                    "transition-colors duration-700 w-full"
                )}
            >
                <NextAuthProvider>
                    <ToastContainer position="top-right" theme="light" />
                    <Header session={session} />
                    <main className="pt-16 -pb-32 h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-600">
                        {children}
                    </main>
                </NextAuthProvider>
            </body>
        </html>
    );
}
