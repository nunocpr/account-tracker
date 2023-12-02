import { prisma } from "@lib/prisma";
import { getUserIdFromSession } from "@/app/_lib/auth/authFunctions";
import { AuthRequiredError, CustomError } from "@lib/exceptions";
import { baseURL } from "../constants";

export const addTransaction = async (transaction: FormData) => {
    const amount = Number(transaction.get("amount"));
    const type = transaction.get("type");
    const categoriesIds = [];
    const description = transaction.get("description") || "";

    for (const [key, value] of transaction.entries()) {
        if (key.startsWith("categories[") && key.endsWith("][id]")) {
            categoriesIds.push(value);
        }
    }

    const payload = {
        type: "add",
        data: {
            amount,
            type,
            categoriesIds,
            description,
        },
    };
    const payloadLength = JSON.stringify(payload).length;
    try {
        const res = await fetch(baseURL + "/api/transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": payloadLength.toString(),
            },
            body: JSON.stringify(payload),
        });

        return res;
    } catch (e: any) {
        throw new CustomError("Error adding transaction", e);
    }
};

// export const editTransaction = async (transaction: TTransaction) => {
//     const payload = {
//         type: "edit",
//         data: {
//             transaction,
//         },
//     };

//     try {
//         const res = await fetch("/api/mainCategory", {
//             method: "POST",
//             headers: Object.fromEntries([
//                 ...headers(),
//                 ["content-type", "application/json"],
//                 ["content-length", JSON.stringify(payload).length],
//             ]),
//             body: JSON.stringify(payload),
//         });
//         return res;
//     } catch (e) {
//         throw new CustomError("Error editing category");
//     }
// };

export const removeTransaction = async (transaction: FormData) => {
    const payload = {
        type: "remove",
        data: {
            transaction,
        },
    };
    const payloadLength = JSON.stringify(payload).length;
    try {
        const res = await fetch("/api/mainCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": payloadLength.toString(),
            },
            body: JSON.stringify(payload),
        });

        return res;
    } catch (e) {
        throw new CustomError("Error removing category");
    }
};

export const fetchTransactions = async (session: {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}) => {
    try {
        // fetch all user transactions

        // console.log("CALLING SESSION IN fetchTransactions: ", session)

        if (!session) {
            throw new AuthRequiredError(
                "You must be logged in to view your transactions."
            );
        }

        const userId = await getUserIdFromSession(session);

        if (!userId) {
            throw new CustomError("There was an error fetching the user.", 403);
        }

        // console.log("CALLING userId IN fetchTransactions: ", userId)

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
            },
        });

        return transactions;
    } catch (error) {
        console.log("ERROR FROM fetchTransactions: ", error);
        throw new CustomError(
            "There was an error fetching main categories.",
            500
        );
    }
};
