import { getServerSession } from "next-auth"
import { headers } from 'next/headers'
import { baseURL } from "@lib/constants"
import { authOptions } from "@api/auth/[...nextauth]/route"

export const preferredRegion = 'home'

export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    return (
        <div className="container p-12 md:px-32 space-y-4 min-h-screen text-white">


        </div>
    )
}
