import { sanitizeString } from "@/app/_lib/utils";
import prisma from "@lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = (await req.json()) as {
            name: string;
            email: string;
            password: string;
        };
        const hashed_password = await hash(password, 16);

        const sanitizedName = sanitizeString(name)
        const sanitizedEmail = sanitizeString(email.toLowerCase())

        const existingUser = await prisma?.user.findUnique({
            where: {
                email: sanitizedEmail,
            },
        });

        if (existingUser) throw new Error("Authentication failed. Invalid credentials");

        const newUser = await prisma.user.create({
            data: {
                name: sanitizedName,
                email: sanitizedEmail,
                hashedPassword: hashed_password,
            },
        });

        return NextResponse.json({
            user: {
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
