
import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { cn } from '@lib/utils';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { NextAuthProvider } from '@/app/clientProviders';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
})


export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    const themeCookie = cookies().get('theme');

    if (!themeCookie?.value.includes('dark') || !themeCookie?.value.includes('light')) {
        themeCookie?.value === 'dark'
    }


    return (
        <html lang="en" className={cn(themeCookie?.value || 'dark')}>
            <body className={cn(inter.variable, 'transition-colors duration-700  w-full')}>
                <NextAuthProvider>
                    <ToastContainer
                        position="top-right"
                        theme="light"
                    />
                    <main className="relative  w-full flex flex-col justify-start bg-gradient-to-b from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-600">
                        {children}
                    </main>
                </NextAuthProvider>

            </body>
        </html>
    )
}
