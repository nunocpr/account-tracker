// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { fromDate, generateSessionToken } from "@lib/utils";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import type { Adapter } from "@auth/core/adapters";
// import { prisma } from "@lib/prisma";

// const adapter: Adapter = PrismaAdapter(prisma);
// const callbacks = {
//     async signIn({ user, account }: any) {
//         if (account.provider === "google" && account.type === "oauth" && user) {
//             const userExists = await prisma.user.findUnique({
//                 where: {
//                     email: user.email,
//                 },
//             });

//             if (!userExists) return true;

//             const sessionToken = generateSessionToken();
//             const sessionMaxAge = 60 * 60 * 24 * 30; // 30Days
//             const sessionExpiry = fromDate(sessionMaxAge);

//             const newSession = await prisma.session.create({
//                 data: {
//                     sessionToken: sessionToken,
//                     userId: userExists.id,
//                     expires: sessionExpiry,
//                 },
//             });
//             console.log("newSession: ", newSession);
//             return true;
//         }

//         return false;
//     },
//     async redirect({ url, baseUrl }: any) {
//         return url.startsWith(baseUrl) ? url : "/dashboard/overview";
//     },
//     async session({ session, token }: any) {
//         if (token) {
//             session.id = token.id;
//             session.isNewUser = token.isNewUser;
//         }
//         return session;
//     },
// };

// export const authOptions: AuthOptions = {
//     adapter,
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/register",
//     },
//     session: {
//         // strategy: "jwt",
//         strategy: "database",
//         // Seconds - How long until an idle session expires and is no longer valid.
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//         // Seconds - Throttle how frequently to write to database to extend a session.
//         // Use it to limit write operations. Set to 0 to always update the database.
//         // Note: This option is ignored if using JSON Web Tokens
//         updateAge: 24 * 60 * 60, // 24 hours
//         generateSessionToken() {
//             return generateSessionToken();
//         },
//     },
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//         // CredentialsProvider({
//         //     name: "credentials",
//         //     credentials: {
//         //         email: {
//         //             label: "Email",
//         //             type: "email",
//         //             placeholder: "example@example.com",
//         //         },
//         //         password: { label: "Password", type: "password" },
//         //     },
//         //     async authorize(credentials): Promise<any> {

//         //         // if there is no email or password field, throw an error
//         //         if (!credentials?.email || !credentials.password) throw new Error("Missing credentials");

//         //         // search the user in the database
//         //         const user = await prisma?.user.findUnique({
//         //             where: {
//         //                 email: credentials.email,
//         //             },
//         //         });

//         //         // if there is no user
//         //         if (!user || !user.hashedPassword) throw new Error("Invalid credentials");

//         //         // compare the input password with the hashed password, stored in the db
//         //         const isValid = await compare(credentials.password, user.hashedPassword);

//         //         // if the password is not valid, throw an error
//         //         if (!isValid) throw new Error("Invalid credentials");

//         //         const sessionToken = generateSessionToken();
//         //         const sessionMaxAge = 60 * 60 * 24 * 30; // 30Days
//         //         const sessionExpiry = fromDate(sessionMaxAge);

//         //         // returns the session
//         //         await adapter.createSession({
//         //             sessionToken: sessionToken,
//         //             userId: user?.id as string,
//         //             expires: sessionExpiry,
//         //         });

//         //         return {
//         //             id: user.id,
//         //             name: user.name,
//         //             email: user.email,
//         //             sessionToken: sessionToken,
//         //         };

//         //     },
//         // }),
//     ],
//     callbacks,
//     // debug: process.env.NODE_ENV === "development"
// };

// async function auth(req: NextApiRequest, res: NextApiResponse) {
//     return await NextAuth(req, res, authOptions);
// }

// export { auth as GET, auth as POST };
export { GET, POST } from "@/auth";
export const runtime = "edge";
