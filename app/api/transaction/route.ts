import { prisma, TransactionType } from "@lib/prisma";
import { ActionType } from "@appTypes/api";
import { revalidateTag } from "next/cache";
import { sanitizeNumber, sanitizeString } from "@lib/utils";
import { handleErrorResponse } from "@lib/exceptions";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export const GET = async () => {
    const session = await auth();
    if (session && session.user) {
        try {
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId: session.user.id,
                },
            });

            revalidateTag("transaction");

            return Response.json({ transactions }, { status: 200 });
        } catch (error) {
            return handleErrorResponse(error);
        }
    } else {
        return Response.json(
            { error: "Unauthorized" },
            {
                status: 401,
                statusText: "You must be logged in to perform this action",
            }
        );
    }
};

/**
 *
 * Having in mind the user, this route will create, edit or remove a transaction, based on the type of the request.
 * The request should be a POST request with a JSON body containing the type of the request and the transaction.
 *
 * @param request POST request
 * @returns a response with the new transaction or errors
 */
export const POST = async (request: NextRequest) => {
    const session = await auth();
    if (session && session.user) {
        console.log(session.user);
        try {
            // get request body
            const { type, data } = await request.json();

            // Perform add, edit or remove actions based on type
            if (type === ActionType.Add) {
                // validate input
                if (!data.amount || sanitizeNumber(data.amount) === 0) {
                    return Response.json(
                        { error: "Amount is required" },
                        { status: 400, statusText: "Amount is required" }
                    );
                }
                //* create a transaction
                const newTransaction = await prisma.transaction.create({
                    data: {
                        amount: sanitizeNumber(data.amount),
                        type:
                            data.type === "Income"
                                ? TransactionType.Income
                                : TransactionType.Expense,
                        mainCategories: data.categoriesIds
                            ? {
                                  connect: data.categoriesIds.map(
                                      (id: string) => ({
                                          id: sanitizeString(id) || undefined,
                                      })
                                  ),
                              }
                            : undefined,
                        description: data.description
                            ? sanitizeString(data.description)
                            : undefined,
                        user: { connect: { id: session.user.id } },
                    },
                });
                revalidateTag("transaction");

                return Response.json({ newTransaction }, { status: 200 });
            } else if (type === ActionType.Edit) {
                console.log("EDIT: ", data);
            } else if (type === ActionType.Remove) {
                console.log("REMOVE: ", data);
            }

            // if the request type is none of the above, return 'Invalid Request' error
            return Response.json(
                { error: "Invalid request" },
                { status: 400, statusText: "Invalid request" }
            );
        } catch (error) {
            // console.log("error in api", error);
            return handleErrorResponse(error);
        }
    } else {
        return Response.json(
            { error: "Unauthorized" },
            {
                status: 401,
                statusText: "You must be logged in to perform this action",
            }
        );
    }
};
