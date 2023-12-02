import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = auth(async (req) => {
    if (req.auth && req.auth.user) {
        return NextResponse.json({
            status: 200,
            body: {
                message: "Logout successful",
            },
        });
    }
});
