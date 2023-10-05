import { getServerSession } from "next-auth"
import { headers } from 'next/headers'
import { baseURL } from "@lib/constants"
import { authOptions } from "@api/auth/[...nextauth]/route"
import ComboMultiSelect from "@components/Form/ComboMultiSelect.component"
import AddMainCategory from "@components/MainCategory/AddMainCategory.component"

export const preferredRegion = 'home'

export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    return (
        <div className="container p-12 md:px-32 space-y-4 min-h-screen">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-slate-950 via-slate-500 to-slate-400 dark:from-slate-600 dark:via-slate-300 dark:to-slate-50 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>

        </div>
    )
}
