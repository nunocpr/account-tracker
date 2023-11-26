"use client";

import { addTransaction } from "@/app/_lib/db/transactionFunctions";
import { handleError } from "@/app/_lib/exceptions";
import { notifyError, notifySuccess } from "@/app/_lib/toast/toastFunctions";
import { cn } from "@/app/_lib/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddTransaction() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const res = await addTransaction(formData);
            if (!res?.ok) {
                notifyError(
                    res.statusText ||
                        "Something went wrong. Please try again later"
                );
                return;
            }
            notifySuccess("Transaction added successfully");
            router.refresh();
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            aria-disabled={loading}
            className="flex flex-col max-w-fit shadow-sm rounded-md border border-gray-100 dark:border-gray-600"
        >
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                disabled={loading}
                required
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2"
                )}
            />
            <input
                type="text"
                name="type"
                placeholder="Type"
                disabled={loading}
                required
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2"
                )}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                disabled={loading}
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2"
                )}
            />
            <input
                type="text"
                name="mainCategory"
                placeholder="Main Category"
                disabled={loading}
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2"
                )}
            />
            <input
                type="text"
                name="subCategory"
                placeholder="Sub Category"
                disabled={loading}
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2"
                )}
            />
            <button
                type="submit"
                className={cn(
                    "h-10 bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4"
                )}
            >
                {loading ? "Loading" : "Add Transaction"}
            </button>
        </form>
    );
}
