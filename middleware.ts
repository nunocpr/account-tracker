export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/example"]
    // matcher: ["/((?!register|api|login).*)"],
};


