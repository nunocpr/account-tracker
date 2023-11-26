import { getUserIdFromSession } from "@/app/_lib/auth/authFunctions";
import { AuthRequiredError, CustomError } from "@lib/exceptions";
import { ISubCategory } from "../../_types/subCategories";
import { sanitizeString } from "../utils";
import { prisma } from "@lib/prisma";

export const addSubCategory = async (subCategory: string) => {
    try {
        const res = await fetch("/api/subCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "add",
                data: {
                    subCategory: sanitizeString(subCategory),
                },
            }),
        });

        return res;
    } catch (e) {
        throw new CustomError("Error adding category");
    }
};

export const editSubCategory = async (
    subCategory: ISubCategory,
    newSubCategory: string
) => {
    try {
        const res = await fetch("/api/subCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "edit",
                data: {
                    subCategory: sanitizeString(subCategory.name),
                    newSubCategory: sanitizeString(newSubCategory),
                },
            }),
        });
        return res;
    } catch (e) {
        throw new CustomError("Error editing category");
    }
};

export const removeSubCategory = async (subCategory: string) => {
    try {
        const res = await fetch("/api/subCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "remove",
                data: {
                    subCategory: sanitizeString(subCategory),
                },
            }),
        });

        return res;
    } catch (e) {
        throw new CustomError("Error removing category");
    }
};

export const fetchSubCategories = async (session: {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}) => {
    try {
        // fetch all sub categories of the user

        // console.log("CALLING SESSION IN fetchSubCategories: ", session)

        if (!session) {
            throw new AuthRequiredError(
                "You must be logged in to view sub categories."
            );
        }

        const userId = await getUserIdFromSession(session);

        if (!userId) {
            throw new CustomError("There was an error fetching the user.", 403);
        }

        // console.log("CALLING userId IN fetchSubCategories: ", userId)

        const subCategories = await prisma.subCategory.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                name: true,
            },
        });

        return subCategories;
    } catch (error) {
        console.log("ERROR FROM fetchSubCategories: ", error);
        throw new CustomError(
            "There was an error fetching sub categories.",
            500
        );
    }
};
