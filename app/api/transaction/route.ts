import prisma from '@lib/prisma';
import { ActionType } from '@appTypes/api';
import { revalidateTag } from 'next/cache';
import { sanitizeNumber, sanitizeString } from '@lib/utils';
import { getServerSession } from 'next-auth';
import { handleErrorResponse } from '@lib/exceptions';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@api/auth/[...nextauth]/route';
import { getUserIdFromSession } from '@lib/authFunctions';


export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {

    }
    // return NextResponse.json({
    //     authenticated: !!session,
    //     session,
    // })

    try {
        // const transactions = await prisma?.transaction.findMany();
        return new NextResponse(JSON.stringify({ derp: "heh" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Something went wrong', { status: 500 });
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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, statusText: 'You must be logged in to perform this action' });
        }

        // get user ID from session
        const userId = await getUserIdFromSession(session);

        // if no user ID, return unauthorized
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, statusText: 'You must be logged in to create a new main transaction.' });
        }

        // get request body
        const { type, data } = await request.json();

        // Perform add, edit or remove actions based on type
        if (type === ActionType.Add) {
            const { transaction } = data;

            /*
                const newTransaction = await prisma.transaction.create({
                    data: {
                        amount: sanitizeNumber(transaction.amount),
                        type: sanitizeString(transaction.type),
                        mainCategory: transaction.mainCategoryId ? { connect: { id: sanitizeString(transaction.mainCategoryId) } } : undefined,
                        subCategory: transaction.subCategoryId ? { connect: { id: sanitizeString(transaction.subCategoryId) } } : undefined,
                        description: transaction.description ? sanitizeString(transaction.description) : undefined,
                        user: { connect: { id: userId } },
                    }
                })
            */

            //* create a transaction

            revalidateTag('transaction');

            // return NextResponse.json({ newTransaction }, { status: 200 });

        } else if (type === ActionType.Edit) {

            //* edit a transaction

            revalidateTag('transaction');

            // return NextResponse.json({ updatedTransaction }, { status: 200, statusText: `The transaction has been updated to ${newTransaction}` });

        } else if (type === ActionType.Remove) {

            //* remove a transaction

            revalidateTag('transaction');

            // return NextResponse.json({ deletedtransaction }, { status: 200, statusText: `The transaction ${transaction} has been deleted` });

        } else {

            // if the request type is none of the above, return 'Invalid Request' error
            return NextResponse.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });

        }


    } catch (error) {
        return handleErrorResponse(error);
    }
}