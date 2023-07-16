import NextAuth from "next-auth/";

declare module "next-auth" {
    interface Profile {
        id: string;
        name: string;
        email: string;
        email_verified: boolean;
        image: string;
    }
}