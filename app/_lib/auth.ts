import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { fromDate, generateSessionToken } from "./utils";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        // strategy: "jwt",
        strategy: "database",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Sign in",
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

                const sessionToken = generateSessionToken();
                const sessionExpiryDate = fromDate(30 * 24 * 60 * 60);

                const session = PrismaAdapter(prisma).createSession({
                    sessionToken: sessionToken,
                    userId: user?.id as string,
                    expires: sessionExpiryDate,
                });


                // if there is no user
                if (!user || !user.hashedPassword) throw new Error("Invalid credentials");

                // compare the input password with the hashed password, stored in the db
                const isValid = await compare(credentials.password, user.hashedPassword);

                // if the password is not valid, throw an error
                if (!isValid) throw new Error("Invalid credentials");

                // return the user
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    sessionToken: sessionToken,
                };

            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {

                if (profile?.email_verified === false) {
                    return false;
                }

                console.log("*************************")
                console.log("*************************")
                console.log("*************************")
                console.log("USER INFORMATION: ", user)
                console.log("*************************")
                console.log("*************************")
                console.log("*************************")


            }
            return true
        },
        async jwt({ token, account, isNewUser }) {
            if (account?.provider === 'google') {
                console.log("*************************")
                console.log("*************************")
                console.log("NEW USER CALL: ", isNewUser)
                console.log("*************************")
                console.log("*************************")
            }
            return token;
        }
    }
};
