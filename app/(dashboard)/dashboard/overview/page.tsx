import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const preferredRegion = "home";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/register");
    }

    return (
        <div className="md:px-32 text-gray-700 dark:text-white">Something</div>
    );
}
