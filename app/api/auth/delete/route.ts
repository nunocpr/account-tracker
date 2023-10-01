import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await getServerSession(authOptions);

    // if there's a session
    if (session) {
        const userEmail = session.user?.email;

        if (userEmail) {
            // find the user
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail
                }
            });

            // if there's a user, delete all their data
            if (user) {
                await prisma.account.deleteMany({
                    where: {
                        userId: user.id
                    }
                });
                await prisma.user.delete({
                    where: {
                        email: userEmail
                    }
                })

            } else {
                return NextResponse.json({
                    status: 404,
                    body: {
                        message: "User not found"
                    }
                })
            }

        }

    }

    return NextResponse.json({
        status: 200,
        body: {
            message: "User deletion successful"
        }
    });
}