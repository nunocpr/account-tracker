// import { sanitizeString } from "@/app/_lib/utils";
// import prisma from "@lib/prisma";
// import { hash } from "bcryptjs";
// import { NextResponse } from "next/server";

export async function POST(req: Request) {

    //     try {
    //         // extract the data from the register form request
    //         const { name, email, password } = (await req.json()) as {
    //             name: string;
    //             email: string;
    //             password: string;
    //             csrfToken: string;
    //         };

    //         // check if the request is valid
    //         if (!((name && email && password) && password.length >= 1)) {
    //             return new NextResponse(
    //                 JSON.stringify({
    //                     status: "error",
    //                     message: "Invalid user parameterss.",
    //                 }),
    //                 { status: 401 }
    //             );
    //         }

    //         const sanitizedName = sanitizeString(name)
    //         const sanitizedEmail = sanitizeString(email.toLowerCase())

    //         // check if there is already a user with the same email
    //         const existingUser = await prisma?.user.findUnique({
    //             where: {
    //                 email: sanitizedEmail,
    //             },
    //         });

    //         // if there is already a user with the same email, return an error
    //         if (!!existingUser) {
    //             return new NextResponse(
    //                 JSON.stringify({
    //                     status: "error",
    //                     message: "User already exists. Please sign in using an alternate method.",
    //                 }),
    //                 { status: 403 }
    //             );
    //         };

    //         const hashed_password = await hash(password, 16);

    //         // create the new user
    //         const user = await prisma.user.create({
    //             data: {
    //                 name: sanitizedName,
    //                 email: sanitizedEmail,
    //                 hashedPassword: hashed_password,
    //             },
    //         });

    //         if (!user) {
    //             return new NextResponse(
    //                 JSON.stringify({
    //                     status: "error",
    //                     message: "Error creating user.",
    //                 }),
    //                 { status: 500 }
    //             );
    //         }

    //         // create an account for the new user
    //         const account = await prisma.account.create({
    //             data: {
    //                 userId: user.id,
    //                 type: "credentials",
    //                 provider: "credentials",
    //                 providerAccountId: user.id,
    //             },
    //         });

    //         if (user && account) {
    //             return NextResponse.json({
    //                 user: {
    //                     id: user.id,
    //                     name: user.name,
    //                     email: user.email,
    //                 },
    //             });
    //         } else {
    //             return new NextResponse(
    //                 JSON.stringify({
    //                     status: "error",
    //                     message: "Unable to link account to created user.",
    //                 }),
    //                 { status: 500 }
    //             );
    //         }

    //     } catch (error: any) {
    //         return new NextResponse(
    //             JSON.stringify({
    //                 status: "error",
    //                 message: error.message,
    //             }),
    //             { status: 500 }
    //         );
    //     }
}
