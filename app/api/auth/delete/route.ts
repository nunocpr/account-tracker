import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "@/auth";
import { User } from "next-auth";

export const POST = auth(async (req) => {
    if (req.auth && req.auth.user) {
        const user: User = req.auth.user;
        const userEmail = user.email;

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
                        userId: user.id,
                    },
                });
                await prisma.mainCategory.deleteMany({
                    where: {
                        userId: user.id,
                    },
                });
                await prisma.account.deleteMany({
                    where: {
                        userId: user.id,
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
});
