"use server";
import prisma from "./prisma";
import { sanitizeNumber, sanitizeString } from "./utils";
import { getUserIdFromSession } from "./auth/authFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

type TTransaction = {
    amount: number;
    type: string;
    description?: string | null;
    mainCategoryId?: string | null;
    subCategoryId?: string | null;
};

export async function createTransaction(transaction: any) {
    console.log(transaction);
    //* create a transaction

    // // get session
    // const session = await getServerSession(authOptions);

    // // if no session, return unauthorized
    // if (!session) {
    //     return NextResponse.json(
    //         { error: "Unauthorized" },
    //         {
    //             status: 401,
    //             statusText: "You must be logged in to perform this action",
    //         }
    //     );
    // }

    // const userId = await getUserIdFromSession(session);

    // // if no user ID, return unauthorized
    // if (!userId) {
    //     return NextResponse.json(
    //         { error: "Unauthorized" },
    //         {
    //             status: 401,
    //             statusText:
    //                 "You must be logged in to create a new main transaction.",
    //         }
    //     );
    // }

    // const newTransaction = await prisma.transaction.create({
    //     data: {
    //         amount: sanitizeNumber(transaction.amount),
    //         type: sanitizeString(transaction.type),
    //         mainCategory: transaction.mainCategoryId
    //             ? {
    //                   connect: {
    //                       id: sanitizeString(transaction.mainCategoryId),
    //                   },
    //               }
    //             : undefined,
    //         subCategory: transaction.subCategoryId
    //             ? { connect: { id: sanitizeString(transaction.subCategoryId) } }
    //             : undefined,
    //         description: transaction.description
    //             ? sanitizeString(transaction.description)
    //             : undefined,
    //         user: { connect: { id: userId } },
    //     },
    // });

    // if (!newTransaction) {
    //     return NextResponse.json(
    //         { error: "Error creating transaction" },
    //         {
    //             status: 500,
    //             statusText: "Error creating transaction",
    //         }
    //     );
    // }

    // revalidateTag("transaction");
    return transaction;
}

export async function editTransaction(
    transactionId: string,
    newTransaction: TTransaction
) {
    // get session
    const session = await getServerSession(authOptions);

    // if no session, return unauthorized
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                statusText: "You must be logged in to perform this action",
            }
        );
    }

    // get user ID from session
    const userId = await getUserIdFromSession(session);

    // if no user ID, return unauthorized
    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                statusText:
                    "You must be logged in to create a new main transaction.",
            }
        );
    }

    // Find the existing transaction
    const existingTransaction = await prisma.transaction.findUnique({
        where: {
            id: sanitizeString(transactionId),
        },
    });

    if (!existingTransaction) {
        return NextResponse.json(
            { error: "Transaction not found" },
            { status: 404 }
        );
    }

    // Update the transaction with the new data
    const editedTransaction = await prisma.transaction.update({
        where: {
            id: existingTransaction.id,
        },
        data: {
            amount: sanitizeNumber(newTransaction.amount),
            type: sanitizeString(newTransaction.type),
            mainCategory: newTransaction.mainCategoryId
                ? {
                      connect: {
                          id: sanitizeString(newTransaction.mainCategoryId),
                      },
                  }
                : undefined,
            subCategory: newTransaction.subCategoryId
                ? {
                      connect: {
                          id: sanitizeString(newTransaction.subCategoryId),
                      },
                  }
                : undefined,
            description: newTransaction.description
                ? sanitizeString(newTransaction.description)
                : undefined,
        },
    });

    if (!editedTransaction) {
        return NextResponse.json(
            { error: "Error editing transaction" },
            {
                status: 500,
                statusText: "Error editing transaction",
            }
        );
    }

    revalidateTag("transaction");

    return NextResponse.json(
        { editedTransaction },
        {
            status: 200,
            statusText: `The transaction has been updated to ${newTransaction}`,
        }
    );
}

export async function removeTransaction(transactionId: string) {
    // Find the existing transaction
    const existingTransaction = await prisma.transaction.findUnique({
        where: {
            id: sanitizeString(transactionId),
        },
    });

    if (!existingTransaction) {
        return NextResponse.json(
            { error: "Transaction not found" },
            { status: 404 }
        );
    }

    // Delete the transaction
    await prisma.transaction.delete({
        where: {
            id: existingTransaction.id,
        },
    });

    revalidateTag("transaction");

    return NextResponse.json(
        { message: "The transaction has been deleted." },
        { status: 200 }
    );
}
