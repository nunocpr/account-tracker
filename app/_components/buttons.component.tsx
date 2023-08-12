"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
    return (
        <button className="mr-3" onClick={() => signIn()}>
            Sign in
        </button>
    );
};

export const RegisterButton = () => {
    return (
        <Link href="/register" className="mr-3">
            Login / Register
        </Link>
    );
};

export const ProfileButton = () => {
    return <Link href="/example">Profile</Link>;
};
