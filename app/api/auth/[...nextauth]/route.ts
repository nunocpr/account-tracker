import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { fromDate, generateSessionToken } from "@/app/_lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import prisma from "@/app/_lib/prisma";
import { encode, decode, JWT, JWTDecodeParams } from 'next-auth/jwt'

const adapter = PrismaAdapter(prisma);
const callbacks = {
    async signIn({ user, account, profile, email, credentials }: any) {
        // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
        if (
            account.type === 'credentials' &&
            account.provider === 'credentials'
        ) {
            if (user) {
                cookies().set("next-auth.session-token", user.sessionToken, {
                    expires: user.sessionExpiry,
                });
            }
        }

        if (account.provider === 'google' && account.type === 'oauth' && user) {

            const userExists = await prisma?.user.findUnique({
                where: {
                    email: user.email,
                },
            });

            if (!userExists) return true;

            const sessionToken = generateSessionToken();
            const sessionMaxAge = 60 * 60 * 24 * 30; // 30Days
            const sessionExpiry = fromDate(sessionMaxAge);

            await adapter.createSession({
                sessionToken: sessionToken,
                userId: userExists?.id as string,
                expires: sessionExpiry,
            });

        }

        return true;
    },
    async redirect({ url, baseUrl }: any) {
        return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {

        if (user && account.type === 'credentials' && account.provider === 'credentials') {
            token.id = user.id;
            token.sessionToken = user.sessionToken
        }

        return token;
    },
    async session({ session, token }: any) {

        if (token) {
            session.id = token.id;
            session.sessionToken = token.sessionToken;
        }
        return session;
    }
}

export const authOptions: AuthOptions = {
    adapter,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {

                // if there is no email or password field, throw an error
                if (!credentials?.email || !credentials.password) throw new Error("Missing credentials");

                // search the user in the database
                const user = await prisma?.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // if there is no user
                if (!user || !user.hashedPassword) throw new Error("Invalid credentials");

                // compare the input password with the hashed password, stored in the db
                const isValid = await compare(credentials.password, user.hashedPassword);

                // if the password is not valid, throw an error
                if (!isValid) throw new Error("Invalid credentials");

                const sessionToken = generateSessionToken();
                const sessionMaxAge = 60 * 60 * 24 * 30; // 30Days
                const sessionExpiry = fromDate(sessionMaxAge);

                // returns the session
                await adapter.createSession({
                    sessionToken: sessionToken,
                    userId: user?.id as string,
                    expires: sessionExpiry,
                });

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    sessionToken: sessionToken,
                };

            },
        }),
    ],
    jwt: {
        // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session  cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
        async encode({ token, secret, maxAge }: any): Promise<string> {
            return encode({ token, secret, maxAge });
        },
        async decode(params: JWTDecodeParams): Promise<JWT | null> {
            const { token, secret } = params;

            return decode({ token, secret });
        },
    },
    callbacks,
    debug: process.env.NODE_ENV === "development"
}


async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, authOptions);
}

export { auth as GET, auth as POST }