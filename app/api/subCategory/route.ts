import prisma from "@lib/prisma";
import { ActionType } from '@appTypes/api';
import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route';
import { handleErrorResponse } from '@lib/exceptions';
import { getUserIdFromSession } from '@/app/_lib/auth/authFunctions';
import { fetchSubCategories } from '@/app/_lib/db/subCategoryFunctions';
import { sanitizeString } from '@lib/utils';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, statusText: 'You must be logged in to perform this action' });
        }

        const subCategories = await fetchSubCategories(session);

        revalidateTag('subCategory');

        return NextResponse.json({ subCategories }, { status: 200 });

    } catch (error) {
        return handleErrorResponse(error);
    }
}

/**
 * 
 * Having in mind the user, this route will create, edit or remove a sub category, based on the type of the request.
 * The request should be a POST request with a JSON body containing the type of the request and the sub category.
 * ex: { type: 'add', subCategory: 'Bank' }
 *     { type: 'edit', subCategory: 'Bank', newSubCategory: 'Banking' }
 *     { type: 'delete', subCategory: 'Bank' }
 * 
 * @param request POST request
 * @returns a response with the new sub category or errors
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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, statusText: 'You must be logged in to create a new sub category.' });
        }

        // get request body
        const { type, data } = await request.json();

        // Perform add, edit or remove actions based on type
        if (type === ActionType.Add) {
            const { subCategory, mainCategoryId } = data;

            if (subCategory === '') {
                return NextResponse.json({ error: 'Category must not be empty.' }, { status: 400 })
            }

            const existingSubCategory = await prisma.subCategory.findFirst({
                where: {
                    name: sanitizeString(subCategory),
                    userId: userId,
                },
            });

            if (existingSubCategory) {
                return NextResponse.json({ error: 'Sub category already exists' }, { status: 400, statusText: 'Sub category already exists' });
            }

            const newSubCategory = await prisma.subCategory.create({
                data: {
                    name: sanitizeString(subCategory),
                    mainCategory: {
                        connect: {
                            id: mainCategoryId,
                        }
                    },
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            revalidateTag('subCategory');

            return NextResponse.json({ newSubCategory }, { status: 200 });

        } else if (type === ActionType.Edit) {
            const { subCategory, newSubCategory } = data;

            // find if there is a category to edit
            const existingSubCategory = await prisma.subCategory.findFirst({
                where: {
                    name: sanitizeString(subCategory),
                    userId: userId,
                },
            });

            const existingNewNameCategory = await prisma.subCategory.findFirst({
                where: {
                    name: sanitizeString(newSubCategory),
                    userId: userId,
                }
            })

            // if there was no change, or newSubCategory has a falsy value, do nothing
            if (subCategory === newSubCategory) {
                return NextResponse.json({ error: 'There was an error while creating the new category.' }, { status: 400 })
            }

            // if there isn't a category to edit, return error
            if (!existingSubCategory) {
                return NextResponse.json({ error: 'Sub category not found' }, { status: 404, statusText: 'Sub category not found' });
            }

            // if the new name is empty, return error.
            if (newSubCategory === '') {
                return NextResponse.json({ error: 'New category name must not be empty.' }, { status: 400 })
            }

            // if there is already a category with the same name as the new category, return error.
            if (existingNewNameCategory) {
                return NextResponse.json({ error: 'There is already a category with this name. Please choose another.' }, { status: 400, statusText: 'Category\' name already exists' });
            }

            const updatedSubCategory = await prisma.subCategory.update({
                where: {
                    id: existingSubCategory.id,
                },
                data: {
                    name: sanitizeString(newSubCategory),
                },
            });

            if (!updatedSubCategory) {
                return NextResponse.json({ error: 'Could not update category.' }, { status: 500, statusText: 'An error occurred when updating category' });
            };

            revalidateTag('subCategory');

            return NextResponse.json({ updatedSubCategory }, { status: 200, statusText: `The category has been updated to ${newSubCategory}` });

        } else if (type === ActionType.Remove) {

            const { subCategory } = data;

            const existingSubCategory = await prisma.subCategory.findFirst({
                where: {
                    id: subCategory,
                    userId: userId,
                },
            });

            if (!existingSubCategory) {
                // console.log('Couldnt find category.')
                return NextResponse.json({ error: 'Sub category not found' }, { status: 404, statusText: 'Sub category not found' });
            }

            const deletedSubCategory = await prisma.subCategory.delete({
                where: {
                    id: existingSubCategory.id,
                },
            });

            if (!deletedSubCategory) {
                return NextResponse.json({ error: 'Could not delete category.' }, { status: 500, statusText: 'An error occurred when deleting category' });
            }

            revalidateTag('subCategory');

            return NextResponse.json({ deletedSubCategory }, { status: 200, statusText: `The category ${subCategory} has been deleted` });

        } else {
            // if the request type is none of the above, return 'Invalid Request' error
            return NextResponse.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
        }


    } catch (error) {
        return handleErrorResponse(error);
    }
}