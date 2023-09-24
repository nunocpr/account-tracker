import { getServerSession } from "next-auth"
import { User } from "./_components/user.component"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { headers } from 'next/headers'
import MultiSelect from "./_components/Form/MultiSelect.component"
import ComboMultiSelect from "./_components/Form/ComboMultiSelect.component"

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'


export default async function Home() {

    const session = await getServerSession(authOptions)

    const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000';
    const res = await fetch(baseURL + '/api/mainCategory', {
        method: 'GET',
        headers: Object.fromEntries(headers()),
        next: {
            tags: ['mainCategory']
        }
    })
    const mainCategories = await res.json()

    // TODO: !!!!!!!!!!!!!
    // This is an example to get the mainCategories from an API route and defines the tag "mainCategories".
    // any time we change categories, either by adding or removing them, we should update the tag with revalidateTag('mainCategories')

    return (
        <div className="container px-12 md:px-32 space-y-4">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#6d6d6d] to-[#cecece] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>

            <h2 className="text-xl font-semibold underline">Server Session</h2>

            <MultiSelect mainCategories={mainCategories} />
            <ComboMultiSelect />


            <p>The DOM will already load this info. It comes directly from the server.</p>
            <p className="text-start">
                {session && "You are currently logged in as: "}
            </p>
            <code className="break-words">{session ? JSON.stringify(session) : "You are not logged in."}</code>
            {session && <User />}
        </div>
    )
}
