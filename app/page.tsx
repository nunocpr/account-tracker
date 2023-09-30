import { getServerSession } from "next-auth"
import { User } from "./_components/user.component"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { headers } from 'next/headers'
import MultiSelect from "./_components/Form/MultiSelect.component"
import ComboMultiSelect from "./_components/Form/ComboMultiSelect.component"
import AddMainCategory from "./_components/MainCategory/AddMainCategory.component"

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'


export default async function Home() {

    const session = await getServerSession(authOptions)

    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000';

    const res = await fetch(baseURL + '/api/mainCategory', {
        method: 'GET',
        headers: Object.fromEntries(headers()),
        next: {
            tags: ['mainCategory'],
        }
    })

    const mainCategories = await res.json();


    return (
        <div className="container p-12 md:px-32 space-y-4 min-h-screen">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-slate-950 via-slate-500 to-slate-400 dark:from-slate-600 dark:via-slate-300 dark:to-slate-50 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>
            {/* BreadCrumbs */}

            {/* Welcome message */}

            {/* Add Transaction */}

            {/* Latest Transactions */}



            <ComboMultiSelect mainCategories={mainCategories} />

            <AddMainCategory />

            {/* 
            <h2 className="text-xl font-semibold underline">Server Session</h2>
            <p>The DOM will already load this info. It comes directly from the server.</p>
            <p className="text-start">
                {session && "You are currently logged in as: "}
            </p>
            <code className="break-words">{session ? JSON.stringify(session) : "You are not logged in."}</code>
            {session && <User />} 
            */}
        </div>
    )
}
