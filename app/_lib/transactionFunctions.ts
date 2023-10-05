import prisma from "@lib/prisma";
import { ITransaction } from "@appTypes/transactions";
import { getUserIdFromSession } from "@lib/authFunctions";
import { AuthRequiredError, CustomError } from "@lib/exceptions";

export const addTransaction = (transaction: ITransaction) => {
    try {
        fetch('/api/transaction/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
    } catch (e) {
        console.log(e);
    }
}

export const editTransaction = (transaction: ITransaction) => {
    try {
        fetch('/api/transaction/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
    } catch (e) {
        console.log(e);
    }
}

export const removeTransaction = (transaction: ITransaction) => {
    try {
        fetch('/api/transaction/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
    } catch (e) {
        console.log(e);
    }
}

export const getTransactions = async (session: { user?: { name?: string | null, email?: string | null, image?: string | null } }) => {

    try {
        // fetch all user transactions

        // console.log("CALLING SESSION IN getTransactions: ", session)

        if (!session) {
            throw new AuthRequiredError('You must be logged in to view main categories.');
        }

        const userId = await getUserIdFromSession(session);

        if (!userId) {
            throw new CustomError('There was an error fetching the user.', 403);
        }

        // console.log("CALLING userId IN getTransactions: ", userId)

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
        console.log("ERROR FROM getTransactions: ", error)
        throw new CustomError('There was an error fetching main categories.', 500);
    }
}
