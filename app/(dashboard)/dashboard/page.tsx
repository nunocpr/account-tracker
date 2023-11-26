import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export const preferredRegion = 'home'

export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/register');
    }

    return (
        <div className="container mx-auto p-12 md:px-32 space-y-4 min-h-screen text-white">


        </div>
    )
}
