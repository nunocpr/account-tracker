import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function POST() {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        status: 200,
        body: {
            message: "Logout successful",
        },
    });
}
