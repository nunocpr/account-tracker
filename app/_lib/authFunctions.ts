import { signOut } from "next-auth/react";

export const handleLogout = async () => {
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
    }
}

export const handleDeleteUser = async () => {
    try {
        fetch('/api/auth/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.log(e);
    } finally {
        signOut()
    }
}
