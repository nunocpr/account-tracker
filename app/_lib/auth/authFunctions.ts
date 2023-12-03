import { signOut } from "next-auth/react";
import { prisma } from "@lib/prisma";
import { CustomError } from "@lib/exceptions";
import { baseURL } from "../constants";

export const handleLogout = async () => {
    try {
        fetch(baseURL + "/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.log(e);
    } finally {
        signOut();
    }
};

export const handleDeleteUser = async () => {
    try {
        fetch(baseURL + "/api/auth/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.log(e);
    } finally {
        signOut();
    }
};

export const getUserIdFromSession = async (session: {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}) => {
    const email = session?.user?.email;

    if (!email) throw new CustomError("Email not found", 404);

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    return user.id;
};
