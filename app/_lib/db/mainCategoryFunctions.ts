import { CustomError } from "@lib/exceptions";
import { sanitizeString } from "@lib/utils";
import { prisma } from "@lib/prisma";
import { User } from "next-auth";
import { MainCategory } from "@prisma/client";

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
    mainCategory: MainCategory,
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

export const fetchMainCategories = async (user: User) => {
    try {
        // fetch all main categories of the user
        const mainCategories = await prisma.mainCategory.findMany({
            where: {
                userId: user.id,
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
