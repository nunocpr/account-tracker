import NextAuth, { NextAuthResult } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "@auth/core/adapters";
import { prisma } from "@lib/prisma";
// import authConfig from "./auth.config";
import { fromDate, generateSessionToken } from "./app/_lib/utils";
import { baseCategories } from "./app/_lib/constants";
import Google from "next-auth/providers/google";

const adapter: Adapter = {
    ...PrismaAdapter(prisma as any),
};

const authConfig = {
    adapter,
    providers: [Google],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database" as const,
        generateSessionToken: () => generateSessionToken(),
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: "/register",
    },
    callbacks: {
        // authorized(params: any) {
        //     return !!params.auth?.user;
        // },
        async signIn({ user, account }: any) {
            if (
                account?.provider === "google" &&
                account?.type === "oidc" &&
                user
            ) {
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: user.email || undefined,
                    },
                });

                if (!userExists) return true;

                const sessionToken = generateSessionToken();
                const sessionMaxAge = 60 * 60 * 24 * 30; // 30Days
                const sessionExpiry = fromDate(sessionMaxAge);

                const newSession = await prisma.session.create({
                    data: {
                        sessionToken: sessionToken,
                        userId: userExists.id,
                        expires: sessionExpiry,
                    },
                });
                console.log("newSession: ", newSession);
                return true;
            }

            return false;
        },
        async redirect({ url, baseUrl }: any) {
            return url.startsWith(baseUrl) ? url : "/dashboard/overview";
        },
        async session({ session, user }: any) {
            const adaptedSession = {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
            };
            return adaptedSession;
        },
    },
    events: {
        createUser: async (message: any) => {
            const userId = message.user.id;

            await prisma.mainCategory.createMany({
                data: baseCategories.map((name) => ({
                    name,
                    userId,
                })),
            });
        },
    },
    // debug: true,
};

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(authConfig) satisfies NextAuthResult;

// export const runtime = "nodejs";
