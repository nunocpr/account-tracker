"use client";

import { addTransaction } from "@/app/_lib/db/transactionFunctions";
import { handleError } from "@/app/_lib/exceptions";
import { notifyError, notifySuccess } from "@/app/_lib/toast/toastFunctions";
import { cn } from "@/app/_lib/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddTransaction({ className }: { className?: string }) {
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

    // TODO:
    // get the types: income, expense
    // get the mainCategories associated with user, and the subCategories associated with the mainCategory
    // input for Amount is a number
    // input for Type is a select
    // input for Description is a text (check limits)
    // input for Main Category is a multiselect
    // input for Sub Category is a multiselect

    return (
        <form
            onSubmit={onSubmit}
            aria-disabled={loading}
            className={cn(
                className,
                "flex flex-col space-y-1 max-w-md shadow-sm rounded-md"
            )}
        >
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                disabled={loading}
                required
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2 outline-none dark:text-gray-800 dark:bg-gray-50 placeholder-slate-400 transition-colors duration-150"
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
                    "h-10 border border-gray-300 rounded-md p-2 outline-none dark:text-gray-800 dark:bg-gray-50 placeholder-slate-400 transition-colors duration-150"
                )}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                disabled={loading}
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2 outline-none dark:text-gray-800 dark:bg-gray-50 placeholder-slate-400 transition-colors duration-150"
                )}
            />
            <input
                type="text"
                name="mainCategory"
                placeholder="Main Category"
                disabled={loading}
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2 outline-none dark:text-gray-800 dark:bg-gray-50 placeholder-slate-400 transition-colors duration-150"
                )}
            />
            <input
                type="text"
                name="subCategory"
                placeholder="Sub Category"
                disabled={loading}
                className={cn(
                    loading && "bg-gray-200",
                    "h-10 border border-gray-300 rounded-md p-2 outline-none dark:text-gray-800 dark:bg-gray-50 placeholder-slate-400 transition-colors duration-150"
                )}
            />
            <button
                type="submit"
                className={cn(
                    loading ? "bg-slate-400" : "bg-indigo-600 ",
                    "px-2 py-1 sm:px-6 sm:py-3 max-w-36 rounded-md cursor-pointer text-white text-sm"
                )}
            >
                {loading ? "Loading" : "Add Transaction"}
            </button>
        </form>
    );
}
