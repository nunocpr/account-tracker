import prisma from "@lib/prisma";
import { TTransaction } from "@appTypes/transactions";
import { getUserIdFromSession } from "@/app/_lib/auth/authFunctions";
import { AuthRequiredError, CustomError } from "@lib/exceptions";

export const addTransaction = async (transaction: TTransaction) => {
    try {

        const res = await fetch('/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: 'add',
                    data: {
                        transaction,
                    }
                }
            )
        });

        return res;

    } catch (e) {
        throw new CustomError('Error adding transaction');
    }
}

export const editTransaction = async (transaction: TTransaction) => {
    try {
        const res = await fetch('/api/mainCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: 'edit',
                    data: {
                        transaction,
                    }
                }
            )
        });
        return res;
    } catch (e) {
        throw new CustomError('Error editing category');
    }
}

export const removeTransaction = async (transaction: TTransaction) => {
    try {
        const res = await fetch('/api/mainCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: 'remove',
                    data: {
                        transaction,
                    }
                }
            )
        });

        return res;
    } catch (e) {
        throw new CustomError('Error removing category');
    }
}

export const fetchTransactions = async (session: { user?: { name?: string | null, email?: string | null, image?: string | null } }) => {

    try {
        // fetch all user transactions

        // console.log("CALLING SESSION IN fetchTransactions: ", session)

        if (!session) {
            throw new AuthRequiredError('You must be logged in to view main categories.');
        }

        const userId = await getUserIdFromSession(session);

        if (!userId) {
            throw new CustomError('There was an error fetching the user.', 403);
        }

        // console.log("CALLING userId IN fetchTransactions: ", userId)

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true
            },
        });

        return transactions;

    } catch (error) {
        console.log("ERROR FROM fetchTransactions: ", error)
        throw new CustomError('There was an error fetching main categories.', 500);
    }
}
