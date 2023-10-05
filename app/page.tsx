import { getServerSession } from "next-auth"
import { headers } from 'next/headers'
import { baseURL } from "@lib/constants"
import { authOptions } from "@api/auth/[...nextauth]/route"
import ComboMultiSelect from "@components/Form/ComboMultiSelect.component"
import AddMainCategory from "@components/MainCategory/AddMainCategory.component"

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'


export default async function Home() {

    const session = await getServerSession(authOptions)

    const res = await fetch(baseURL + '/api/mainCategory', {
        method: 'GET',
        headers: Object.fromEntries(headers()),
        next: {
            tags: ['mainCategory'],
        }
    })

    const { mainCategories } = await res.json();

    return (
        <div className="container p-12 md:px-32 space-y-4 min-h-screen">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-slate-950 via-slate-500 to-slate-400 dark:from-slate-600 dark:via-slate-300 dark:to-slate-50 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>
            {/* BreadCrumbs */}

            {/* Welcome message */}
            <p className="text-white py-4">Welcome, <span>
                {
                    !session ? (
                        "please register above."
                    ) : (
                        session?.user?.name
                    )
                }
            </span>
            </p>
            {/* Add Transaction */}

            {/* Latest Transactions */}



            {session && <ComboMultiSelect mainCategories={mainCategories} />}

            {session && <AddMainCategory />}

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
