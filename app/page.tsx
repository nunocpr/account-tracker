import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "@/app/_components/buttons.component"
import { getServerSession } from "next-auth"
import { authOptions } from "@lib/auth"
import { User } from "./_components/user.component"

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function Home() {
    const session = await getServerSession(authOptions)
    console.log("SESSION ON MAIN PAGE: ", session)

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#6d6d6d] to-[#cecece] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>

            <div>
                <LoginButton />
                <RegisterButton />
                <LogoutButton />
                <ProfileButton />
            </div>
            <pre>{JSON.stringify(session)}</pre>
            <User />
        </main>
    )
}
