import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route";

export async function POST() {
    const session = await getServerSession(authOptions);

    return {
        status: 200,
        body: {
            message: "Logout successful"
        }
    }
}