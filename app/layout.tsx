import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './clientProviders'


const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
})


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <NextAuthProvider>
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    )
}
