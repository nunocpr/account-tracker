"use client";

import { useSession } from "next-auth/react";

export const User = () => {
    const { data: session } = useSession();

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold underline">Client Session</h2>
            <p>This one lags as it depends on the client's browser to process.</p>
            <code className="break-words">{session ? JSON.stringify(session) : "You are not logged in."}</code>

            <button onClick={() => handleRefresh()}>Click to refresh the page.</button>
        </div>
    );
};
