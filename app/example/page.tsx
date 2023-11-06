import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@components/Header/Header.component";

export default async function ProtectedPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    return (
        <div>
            <Header session={session} />
        </div>
    )
}
