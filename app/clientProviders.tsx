"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

/**
 * 
 * @returns the provider for the next-auth session. This will make the session available to all of its children.
 */
export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};
