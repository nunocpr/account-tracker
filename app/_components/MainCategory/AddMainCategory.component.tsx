"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { handleError } from "@lib/exceptions";
import { addMainCategory } from "@lib/db/mainCategoryFunctions";
import { notifyError, notifySuccess } from "@lib/toast/toastFunctions";
import { cn } from "@lib/utils";

export default function AddMainCategory({ className }: { className?: string }) {
    const router = useRouter();

    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await addMainCategory(category);

            if (!res?.ok) {
                notifyError(
                    res.statusText ||
                        "Something went wrong. Please try again later"
                );
                return;
            }

            setCategory("");

            notifySuccess("Category added successfully");

            router.refresh();
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    return (
        <div className={cn(className, "flex shadow-sm rounded-md")}>
            <input
                type="text"
                name="add_category"
                onChange={handleChange}
                value={category}
                autoComplete="off"
                placeholder="Add a Main Category"
                className="min-w-0 py-1 pl-3 placeholder:text-sm rounded-l-md text-gray-800 dark:bg-gray-600 dark:text-white"
            />
            <button
                onClick={onSubmit}
                className={cn(
                    loading ? "bg-slate-400" : "bg-amber-500 ",
                    "px-2 py-1 max-w-36 rounded-r-md cursor-pointer text-white text-sm hover:bg-amber-600"
                )}
                disabled={loading}
            >
                {loading ? (
                    "Loading..."
                ) : (
                    <PlusIcon className="h-6 w-6 text-white" />
                )}
            </button>
        </div>
    );
}
