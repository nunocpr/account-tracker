// export { default } from 'next-auth/middleware';

import { withAuth } from 'next-auth/middleware'

export default withAuth(
    {
        callbacks: {
            authorized: async ({ req: { cookies } }) => {
                const cookieName = process.env.NODE_ENV !== 'production' ? "next-auth.session-token" : "__Secure-next-auth.session-token";
                const session = await (await fetch('http://localhost:3000/api/auth/session', { method: 'GET', headers: { 'Cookie': `${cookieName}=${cookies.get(cookieName)?.value}` } })).json();
                return !!session.user;
            },
        },
    }
)

export const config = {
    matcher: [
        // "/example", // will be protected
        "/((?!register|api|login|$).*)" // will not be protected
    ]
};


