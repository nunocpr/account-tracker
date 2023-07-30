import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth"

export async function POST() {
    const session = await getServerSession();

    if (session) {
        const userEmail = session.user?.email;

        if (userEmail) {
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail
                }
            });

            if (user) {
                await prisma.session.deleteMany({
                    where: {
                        userId: user.id
                    }
                });
            }
        }

    }


    return {
        status: 200,
        body: {
            message: "Logout successful"
        }
    }
}