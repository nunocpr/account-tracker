'server only'
import { getServerSession } from "next-auth";
import prisma from "@lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { AuthRequiredError, CustomError } from "@lib/exceptions";

export async function getUserIdFromSession(session: {
    user?: {
        name?: string | null,
        email?: string | null,
        image?: string | null,
    }
}) {
    const email = session?.user?.email;

    if (!email) throw new CustomError('Email not found', 404);

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (!user) {
        throw new CustomError('User not found', 404);
    }

    return user.id;
}

export async function getMainCategories(session: {
    user?: {
        name?: string | null,
        email?: string | null,
        image?: string | null,
    }
}) {
    try {
        // fetch all main categories of the user
        console.log("CALLING SESSION IN getMainCategories: ", session)
        if (!session) {
            throw new AuthRequiredError('You must be logged in to view main categories.');
        }

        const userId = await getUserIdFromSession(session);
        if (!userId) {
            throw new CustomError('There was an error fetching the user.', 403);
        }
        console.log("CALLING userId IN getMainCategories: ", userId)

        const mainCategories = await prisma.mainCategory.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                name: true,
            },
        });

        return mainCategories;

    } catch (error) {
        console.log("ERROR FROM getMainCategories: ", error)
        throw new CustomError('There was an error fetching main categories.', 500);
    }
}

