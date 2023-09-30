import { NextRequest, NextResponse } from 'next/server'
import prisma from "@lib/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { sanitizeString } from '@lib/utils';
import { ActionType } from '@appTypes/api';
import { getMainCategories, getUserIdFromSession } from './handlers';
import { handleErrorResponse } from '@/app/_lib/exceptions';
import { revalidateTag } from 'next/cache';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, statusText: 'You must be logged in to perform this action' });
        }

        const mainCategories = await getMainCategories(session);

        revalidateTag('mainCategory');

        return NextResponse.json({ mainCategories }, { status: 200 });

    } catch (error) {
        return handleErrorResponse(error);
    }
}

/**
 * 
 * Having in mind the user, this route will create, edit or remove a main category, based on the type of the request.
 * The request should be a POST request with a JSON body containing the type of the request and the main category.
 * ex: { type: 'add', mainCategory: 'Bank' }
 *     { type: 'edit', mainCategory: 'Bank', newMainCategory: 'Banking' }
 *     { type: 'delete', mainCategory: 'Bank' }
 * 
 * @param request POST request
 * @returns a response with the new main category or errors
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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, statusText: 'You must be logged in to create a new main category.' });
        }

        // get request body
        const { type, data } = await request.json();

        // Perform add, edit or remove actions based on type
        if (type === ActionType.Add) {
            const { mainCategory } = data;

            if (mainCategory === '') {
                return NextResponse.json({ error: 'Category must not be empty.' }, { status: 400 })
            }

            const existingMainCategory = await prisma.mainCategory.findFirst({
                where: {
                    name: sanitizeString(mainCategory),
                    userId: userId,
                },
            });

            if (existingMainCategory) {
                return NextResponse.json({ error: 'Main category already exists' }, { status: 400, statusText: 'Main category already exists' });
            }

            const newMainCategory = await prisma.mainCategory.create({
                data: {
                    name: sanitizeString(mainCategory),
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            revalidateTag('mainCategory');

            return NextResponse.json({ newMainCategory }, { status: 200 });

        } else if (type === ActionType.Edit) {

            const { mainCategory, newMainCategory } = data;

            const existingMainCategory = await prisma.mainCategory.findFirst({
                where: {
                    name: sanitizeString(mainCategory),
                    userId: userId,
                },
            });

            if (!existingMainCategory) {
                return NextResponse.json({ error: 'Main category not found' }, { status: 404, statusText: 'Main category not found' });
            }

            const updatedMainCategory = await prisma.mainCategory.update({
                where: {
                    id: existingMainCategory.id,
                },
                data: {
                    name: sanitizeString(newMainCategory),
                },
            });

            if (!updatedMainCategory) {
                return NextResponse.json({ error: 'Could not update category.' }, { status: 500, statusText: 'An error occurred when updating category' });
            }
            revalidateTag('mainCategory');

            return NextResponse.json({ updatedMainCategory }, { status: 200, statusText: `The category has been updated to ${newMainCategory}` });

        } else if (type === ActionType.Remove) {
            const { mainCategory } = data;
            const existingMainCategory = await prisma.mainCategory.findFirst({
                where: {
                    name: sanitizeString(mainCategory),
                    userId: userId,
                },
            });
            if (!existingMainCategory) {
                return NextResponse.json({ error: 'Main category not found' }, { status: 404, statusText: 'Main category not found' });
            }

            const deletedMainCategory = await prisma.mainCategory.delete({
                where: {
                    id: existingMainCategory.id,
                },
            });

            if (!deletedMainCategory) {
                return NextResponse.json({ error: 'Could not delete category.' }, { status: 500, statusText: 'An error occurred when deleting category' });
            }
            revalidateTag('mainCategory');

            return NextResponse.json({ deletedMainCategory }, { status: 200, statusText: `The category ${mainCategory} has been deleted` });

        } else {
            // if the request type is none of the above, return 'Invalid Request' error
            return NextResponse.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
        }


    } catch (error) {
        return handleErrorResponse(error);
    }
}