"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { cn } from "../_lib/utils";

export const RegisterForm = () => {
    let [loading, setLoading] = useState(false);
    let [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {
                alert((await res.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/" });
        } catch (error: any) {
            setLoading(false);
            console.error(error);
            alert(error.message);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col w-[500px] gap-y-3"
        >
            <label htmlFor="name">Name</label>
            <input
                required
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="p-4"
            />
            <label htmlFor="email">Email</label>
            <input
                required
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="p-4"
            />
            <label htmlFor="password">Password</label>
            <input
                required
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="p-4"
            />
            <button
                className={cn(loading ? 'bg-[#ccc]' : 'bg-[#3446eb]', 'p-4 cursor-pointer text-white')}
                disabled={loading}
            >
                {loading ? "loading..." : "Register"}
            </button>
        </form>
    );
};
