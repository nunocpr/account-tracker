import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Example from "../_components/sidebar_on_dark";

export default async function ProtectedPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    return (
        <div>
            <h1>Protected Page</h1>
            <h2>{session.user?.name}</h2>

            <Example />
        </div>
    )
}