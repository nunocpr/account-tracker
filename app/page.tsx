import { getServerSession } from "next-auth"
import { User } from "./_components/user.component"
import { authOptions } from "./api/auth/[...nextauth]/route"
import MultiSelect from "./_components/Form/MultiSelect.component"

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="container px-12 md:px-32 space-y-4">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#6d6d6d] to-[#cecece] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>

            <h2 className="text-xl font-semibold underline">Server Session</h2>
            <p>The DOM will already load this info. It comes directly from the server.</p>
            <p className="text-start">
                {session && "You are currently logged in as: "}
            </p>
            <code className="break-words">{session ? JSON.stringify(session) : "You are not logged in."}</code>
            {session && <User />}
            <MultiSelect />
        </div>
    )
}
