
import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './clientProviders'
import { cn } from '@lib/utils'
import { cookies } from 'next/headers'
import Header from './_components/Header/Header.component'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
})


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const themeCookie = cookies().get('theme');

    if (!themeCookie?.value.includes('dark') || !themeCookie?.value.includes('light')) {
        themeCookie?.value === 'dark'
    }

    const session = await getServerSession(authOptions);

    return (
        <html lang="en" className={themeCookie?.value || 'dark'}>
            <body className={cn(inter.variable, 'transition-colors duration-700 h-full w-full')}>
                <NextAuthProvider>
                    <ToastContainer
                        position="top-right"
                        theme="light"
                    />
                    <Header session={session} />
                    <main className="relative flex min-h-screen flex-col justify-start  bg-gradient-to-b from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-600">
                        {children}
                    </main>
                </NextAuthProvider>

            </body>
        </html>
    )
}
