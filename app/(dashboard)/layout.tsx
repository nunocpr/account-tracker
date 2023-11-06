import { getServerSession } from 'next-auth';
import { authOptions } from '@api/auth/[...nextauth]/route';
import Header from '@components/Header/Header.component';
import Sidebar from '../_components/Sidebar/Sidebar.component';

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions);

    return (
        <>
            <Header session={session} />
            <div className="flex">
                <Sidebar />
                <section className="relative grow sm:w-full flex flex-col justify-start bg-gradient-to-b from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-600">
                    {children}
                </section>

            </div>
        </>
    )
}
