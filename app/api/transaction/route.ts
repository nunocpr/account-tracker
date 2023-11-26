import { prisma, TransactionType } from "@lib/prisma";
import { ActionType } from "@appTypes/api";
import { revalidateTag } from "next/cache";
import { sanitizeNumber, sanitizeString } from "@lib/utils";
import { getServerSession } from "next-auth";
import { handleErrorResponse } from "@lib/exceptions";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { getUserIdFromSession } from "@/app/_lib/auth/authFunctions";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
    }
    // return NextResponse.json({
    //     authenticated: !!session,
    //     session,
    // })

    try {
        // const transactions = await prisma?.transaction.findMany();
        return new NextResponse(JSON.stringify({ derp: "heh" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}

/**
 *
 * Having in mind the user, this route will create, edit or remove a transaction, based on the type of the request.
 * The request should be a POST request with a JSON body containing the type of the request and the transaction.
 *
 * @param request POST request
 * @returns a response with the new transaction or errors
 */
export async function POST(request: NextRequest) {
    try {
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

        // get request body
        const { type, data } = await request.json();

        // Perform add, edit or remove actions based on type
        if (type === ActionType.Add) {
            //* create a transaction

            const newTransaction = await prisma.transaction.create({
                data: {
                    amount: sanitizeNumber(data.amount) || 0,
                    type:
                        data.type === "Expense"
                            ? TransactionType.Expense
                            : TransactionType.Income,
                    mainCategory: data.mainCategoryId
                        ? {
                              connect: {
                                  id:
                                      sanitizeString(data.mainCategoryId) ||
                                      undefined,
                              },
                          }
                        : undefined,
                    subCategory: data.subCategoryId
                        ? {
                              connect: {
                                  id:
                                      sanitizeString(data.subCategoryId) ||
                                      undefined,
                              },
                          }
                        : undefined,
                    description: data.description
                        ? sanitizeString(data.description)
                        : undefined,
                    user: { connect: { id: userId } },
                },
            });
            revalidateTag("transaction");

            return NextResponse.json({ newTransaction }, { status: 200 });
        } else if (type === ActionType.Edit) {
            // //* edit a transaction
            // const { transactionId, newTransaction } = data;
            // // Find the existing transaction
            // const existingTransaction = await prisma.transaction.findUnique({
            //     where: {
            //         id: sanitizeString(transactionId),
            //     },
            // });
            // if (!existingTransaction) {
            //     return NextResponse.json(
            //         { error: "Transaction not found" },
            //         { status: 404 }
            //     );
            // }
            // // Update the transaction with the new data
            // const editedTransaction = await prisma.transaction.update({
            //     where: {
            //         id: existingTransaction.id,
            //     },
            //     data: {
            //         amount: sanitizeNumber(newTransaction.amount),
            //         type:
            //             newTransaction.type === "Expense"
            //                 ? TransactionType.Expense
            //                 : TransactionType.Income,
            //         mainCategory: newTransaction.mainCategoryId
            //             ? {
            //                   connect: {
            //                       id: sanitizeString(
            //                           newTransaction.mainCategoryId
            //                       ),
            //                   },
            //               }
            //             : undefined,
            //         subCategory: newTransaction.subCategoryId
            //             ? {
            //                   connect: {
            //                       id: sanitizeString(
            //                           newTransaction.subCategoryId
            //                       ),
            //                   },
            //               }
            //             : undefined,
            //         description: newTransaction.description
            //             ? sanitizeString(newTransaction.description)
            //             : undefined,
            //     },
            // });
            // revalidateTag("transaction");
            // return NextResponse.json(
            //     { editedTransaction },
            //     {
            //         status: 200,
            //         statusText: `The transaction has been updated to ${newTransaction}`,
            //     }
            // );
        } else if (type === ActionType.Remove) {
            // //* remove a transaction
            // const { transactionId } = data;
            // // Find the existing transaction
            // const existingTransaction = await prisma.transaction.findUnique({
            //     where: {
            //         id: sanitizeString(transactionId),
            //     },
            // });
            // if (!existingTransaction) {
            //     return NextResponse.json(
            //         { error: "Transaction not found" },
            //         { status: 404 }
            //     );
            // }
            // // Delete the transaction
            // await prisma.transaction.delete({
            //     where: {
            //         id: existingTransaction.id,
            //     },
            // });
            // revalidateTag("transaction");
            // return NextResponse.json(
            //     { message: "The transaction has been deleted." },
            //     { status: 200 }
            // );
        }

        // if the request type is none of the above, return 'Invalid Request' error
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400, statusText: "Invalid request" }
        );
    } catch (error) {
        return handleErrorResponse(error);
    }
}
