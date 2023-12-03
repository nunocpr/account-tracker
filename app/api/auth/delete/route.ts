import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "@/auth";

export const POST = async () => {
    const session = await auth();

    if (session && session?.user) {
        const userId = session?.user?.id;
        const userEmail = session?.user?.email;

        if (userEmail) {
            // find the user
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail,
                },
            });

            // if there's a user, delete all their data
            if (user) {
                await prisma.transaction.deleteMany({
                    where: {
                        userId,
                    },
                });
                await prisma.mainCategory.deleteMany({
                    where: {
                        userId,
                    },
                });
                await prisma.account.deleteMany({
                    where: {
                        userId,
                    },
                });
                await prisma.user.delete({
                    where: {
                        email: userEmail,
                    },
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    body: {
                        message: "User not found",
                    },
                });
            }
        }

        return NextResponse.json({
            status: 200,
            body: {
                message: "User deletion successful",
            },
        });
    } else {
        return NextResponse.json({
            status: 401,
            body: {
                message: "User not authenticated",
            },
        });
    }
};
