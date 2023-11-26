"use client";
import { createTransaction } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

export default function AddTransaction() {
    const { pending } = useFormStatus();

    return (
        <form
            action={(data) => createTransaction(data)}
            className="flex max-w-fit shadow-sm rounded-md border border-gray-100 dark:border-gray-600"
        >
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                required
                className="h-10 border border-gray-300 rounded-md p-2"
            />
            <input
                type="text"
                name="type"
                placeholder="Type"
                required
                className="h-10 border border-gray-300 rounded-md p-2"
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                className="h-10 border border-gray-300 rounded-md p-2"
            />
            <input
                type="text"
                name="mainCategory"
                placeholder="Main Category"
                className="h-10 border border-gray-300 rounded-md p-2"
            />
            <input
                type="text"
                name="subCategory"
                placeholder="Sub Category"
                className="h-10 border border-gray-300 rounded-md p-2"
            />
            <button
                type="submit"
                className="h-10 bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4"
                disabled={pending}
            >
                {pending ? "Loading..." : "Add"}
            </button>
        </form>
    );
}
