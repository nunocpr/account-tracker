import { getUserIdFromSession } from "@lib/auth/authFunctions";
import { AuthRequiredError, CustomError } from "@lib/exceptions";
import { IMainCategory } from "@appTypes/mainCategories";
import { sanitizeString } from "@lib/utils";
import { prisma } from "@lib/prisma";

export const addMainCategory = async (mainCategory: string) => {
    try {
        const res = await fetch("/api/mainCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "add",
                data: {
                    mainCategory: sanitizeString(mainCategory),
                },
            }),
        });

        return res;
    } catch (e) {
        throw new CustomError("Error adding category");
    }
};

export const editMainCategory = async (
    mainCategory: IMainCategory,
    newMainCategory: string
) => {
    try {
        const res = await fetch("/api/mainCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "edit",
                data: {
                    mainCategory: sanitizeString(mainCategory.name),
                    newMainCategory: sanitizeString(newMainCategory),
                },
            }),
        });
        return res;
    } catch (e) {
        throw new CustomError("Error editing category");
    }
};

export const removeMainCategory = async (mainCategory: string) => {
    try {
        const res = await fetch("/api/mainCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "remove",
                data: {
                    mainCategory: sanitizeString(mainCategory),
                },
            }),
        });

        return res;
    } catch (e) {
        throw new CustomError("Error removing category");
    }
};

export const fetchMainCategories = async (session: {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}) => {
    try {
        // fetch all main categories of the user

        // console.log("CALLING SESSION IN fetchMainCategories: ", session)

        if (!session) {
            throw new AuthRequiredError(
                "You must be logged in to view main categories."
            );
        }

        const userId = await getUserIdFromSession(session);

        if (!userId) {
            throw new CustomError("There was an error fetching the user.", 403);
        }

        // console.log("CALLING userId IN fetchMainCategories: ", userId)

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
        console.log("ERROR FROM fetchMainCategories: ", error);
        throw new CustomError(
            "There was an error fetching main categories.",
            500
        );
    }
};
