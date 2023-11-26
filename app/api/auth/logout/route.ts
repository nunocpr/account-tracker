import { prisma } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        status: 200,
        body: {
            message: "Logout successful",
        },
    });
}
