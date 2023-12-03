// export { default } from 'next-auth/middleware';

// import { withAuth } from 'next-auth/middleware'

// export default withAuth(
//     {
//         callbacks: {
//             authorized: async ({ req: { cookies } }) => {
//                 const cookieName = process.env.NODE_ENV !== 'production' ? "next-auth.session-token" : "__Secure-next-auth.session-token";
//                 const session = await (await fetch('http://localhost:3000/api/auth/session', { method: 'GET', headers: { 'Cookie': `${cookieName}=${cookies.get(cookieName)?.value}` } })).json();
//                 return !!session.user;
//             },
//         },
//     }
// )

// import authConfig from "./auth.config";
// import NextAuth from "next-auth";
// export const { auth: middleware } = NextAuth(authConfig);
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    if (req.nextUrl.pathname.startsWith("/_next") || req.auth) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/register", req.nextUrl));
});

export const config = {
    matcher: [
        // "/example", // will be protected
        "/((?!register|api|login|$).*)", // will not be protected
    ],
};
