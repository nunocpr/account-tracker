import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { cn } from '@lib/utils';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { ToastContainer } from 'react-toastify';
import { NextAuthProvider } from '@/app/clientProviders';
import { authOptions } from '@api/auth/[...nextauth]/route';
import Header from '@components/Header/Header.component';

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

    const session = await getServerSession(authOptions);

    return (
        <html lang="en" className={themeCookie?.value || 'dark'}>
            <body className={cn(inter.variable, 'transition-colors duration-700 h-full w-full')}>
                <NextAuthProvider>
                    <ToastContainer
                        position="top-right"
                        theme="light"
                    />
                    {/* <Header session={session} /> */}
                    <section className="relative flex min-h-screen justify-start ">
                        {/* Sidebar */}
                        <ul className="hidden pl-8 lg:pl-10 pt-14 space-y-3 md:flex md:flex-col dark:text-white bg-slate-200 dark:bg-gray-800 md:min-w-[300px]">
                            <li>Summary Overview</li>
                            <li>Transaction History</li>
                            <li>Income</li>
                            <li>Expenses</li>
                            <li>Budget Tracking?</li>
                            <li>Financial Goals</li>
                            <li>Reports and Insights</li>
                            <li>Settings and Preferences</li>
                        </ul>
                        {children}
                    </section>
                </NextAuthProvider>

            </body>
        </html>
    )
}
