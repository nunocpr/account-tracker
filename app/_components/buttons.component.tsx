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
            Register
        </Link>
    );
};

const handleLogout = async () => {
    try {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.log(e);
    } finally {
        signOut()
        console.log("Logged Out")
    }
}

export const LogoutButton = () => {
    return (
        // <button className="mr-3" onClick={() => signOut()}>
        <button className="mr-3" onClick={() => handleLogout()}>
            Sign Out
        </button >
    );
};

export const ProfileButton = () => {
    return <Link href="/example">Profile</Link>;
};
