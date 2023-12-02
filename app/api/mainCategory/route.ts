import { prisma } from "@lib/prisma";
import { ActionType } from "@appTypes/api";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { handleErrorResponse } from "@lib/exceptions";
import { fetchMainCategories } from "@lib/db/mainCategoryFunctions";
import { sanitizeString } from "@lib/utils";
import { auth } from "@/auth";

export const GET = auth(async (request) => {
    if (request.auth && request.auth.user) {
        try {
            const mainCategories = await fetchMainCategories(request.auth.user);

            revalidateTag("mainCategory");

            return NextResponse.json({ mainCategories }, { status: 200 });
        } catch (error) {
            return handleErrorResponse(error);
        }
    } else {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                statusText: "You must be logged in to perform this action",
            }
        );
    }
});

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
export const POST = auth(async (request) => {
    if (request.auth && request.auth.user) {
        try {
            // get request body
            const { type, data } = await request.json();

            // Perform add, edit or remove actions based on type
            if (type === ActionType.Add) {
                const { mainCategory } = data;

                if (mainCategory === "") {
                    return NextResponse.json(
                        { error: "Category must not be empty." },
                        { status: 400 }
                    );
                }

                const existingMainCategory =
                    await prisma.mainCategory.findFirst({
                        where: {
                            name: sanitizeString(mainCategory),
                            userId: request.auth.user.id,
                        },
                    });

                if (existingMainCategory) {
                    return NextResponse.json(
                        { error: "Main category already exists" },
                        {
                            status: 400,
                            statusText: "Main category already exists",
                        }
                    );
                }

                const newMainCategory = await prisma.mainCategory.create({
                    data: {
                        name: sanitizeString(mainCategory),
                        user: {
                            connect: {
                                id: request.auth.user.id,
                            },
                        },
                    },
                });
                revalidateTag("mainCategory");

                return NextResponse.json({ newMainCategory }, { status: 200 });
            } else if (type === ActionType.Edit) {
                const { mainCategory, newMainCategory } = data;

                // find if there is a category to edit
                const existingMainCategory =
                    await prisma.mainCategory.findFirst({
                        where: {
                            name: sanitizeString(mainCategory),
                            userId: request.auth.user.id,
                        },
                    });

                const existingNewNameCategory =
                    await prisma.mainCategory.findFirst({
                        where: {
                            name: sanitizeString(newMainCategory),
                            userId: request.auth.user.id,
                        },
                    });

                // if there was no change, or newMainCategory has a falsy value, do nothing
                if (mainCategory === newMainCategory) {
                    return NextResponse.json(
                        {
                            error: "There was an error while creating the new category.",
                        },
                        { status: 400 }
                    );
                }

                // if there isn't a category to edit, return error
                if (!existingMainCategory) {
                    return NextResponse.json(
                        { error: "Main category not found" },
                        { status: 404, statusText: "Main category not found" }
                    );
                }

                // if the new name is empty, return error.
                if (newMainCategory === "") {
                    return NextResponse.json(
                        { error: "New category name must not be empty." },
                        { status: 400 }
                    );
                }

                // if there is already a category with the same name as the new category, return error.
                if (existingNewNameCategory) {
                    return NextResponse.json(
                        {
                            error: "There is already a category with this name. Please choose another.",
                        },
                        {
                            status: 400,
                            statusText: "Category' name already exists",
                        }
                    );
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
                    return NextResponse.json(
                        { error: "Could not update category." },
                        {
                            status: 500,
                            statusText:
                                "An error occurred when updating category",
                        }
                    );
                }

                revalidateTag("mainCategory");

                return NextResponse.json(
                    { updatedMainCategory },
                    {
                        status: 200,
                        statusText: `The category has been updated to ${newMainCategory}`,
                    }
                );
            } else if (type === ActionType.Remove) {
                const { mainCategory } = data;

                const existingMainCategory =
                    await prisma.mainCategory.findFirst({
                        where: {
                            id: mainCategory,
                            userId: request.auth.user.id,
                        },
                    });

                if (!existingMainCategory) {
                    console.log("couldnt find category.");
                    return NextResponse.json(
                        { error: "Main category not found" },
                        { status: 404, statusText: "Main category not found" }
                    );
                }

                const deletedMainCategory = await prisma.mainCategory.delete({
                    where: {
                        id: existingMainCategory.id,
                    },
                });

                if (!deletedMainCategory) {
                    return NextResponse.json(
                        { error: "Could not delete category." },
                        {
                            status: 500,
                            statusText:
                                "An error occurred when deleting category",
                        }
                    );
                }

                revalidateTag("mainCategory");

                return NextResponse.json(
                    { deletedMainCategory },
                    {
                        status: 200,
                        statusText: `The category ${mainCategory} has been deleted`,
                    }
                );
            } else {
                // if the request type is none of the above, return 'Invalid Request' error
                return NextResponse.json(
                    { error: "Invalid request" },
                    { status: 400, statusText: "Invalid request" }
                );
            }
        } catch (error) {
            return handleErrorResponse(error);
        }
    } else {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                statusText: "You must be logged in to perform this action",
            }
        );
    }
});
