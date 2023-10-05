'use client'
import { AuthFailedError, AuthRequiredError, CustomError, handleError } from "@/app/_lib/exceptions";
import { addMainCategory } from "@/app/_lib/mainCategoryFunctions";
import { notifyError, notifySuccess } from "@/app/_lib/toastFunctions";
import { cn } from "@/app/_lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddMainCategory() {

    const router = useRouter();

    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await addMainCategory(category);

            if (!res?.ok) {
                notifyError(res.statusText || 'Something went wrong. Please try again later');
                return;
            }

            setCategory('');

            notifySuccess('Category added successfully');

            router.refresh()

        } catch (error: unknown) {
            handleError(error);
        } finally {
            setLoading(false);
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    return (
        <div className="flex max-w-fit shadow-sm rounded-md border border-gray-100 dark:border-gray-600">
            <input
                type="text"
                name="add_category"
                onChange={handleChange}
                value={category}
                placeholder="Home..."
                // className="p-2 pl-3 min-w-[100px] outline-none dark:bg-gray-800 dark:text-white rounded-l-md placeholder:text-sm"
                className="py-2 pl-3 placeholder:text-sm rounded-l-md outline outline-1 outline-gray-300 dark:outline-gray-500  text-gray-800 dark:bg-gray-800 dark:text-white focus-visible:outline-amber-700 dark:focus-visible:outline-amber-400 transition-all duration-200"
            />
            <button
                onClick={onSubmit}
                className={cn(loading ? 'bg-slate-400' : 'bg-indigo-600 ', 'px-2 py-1 sm:px-6 sm:py-3 max-w-36 rounded-r-md cursor-pointer text-white text-sm')}
                disabled={loading}
            >
                {loading ? "Loading..." : "Add"}
            </button>
        </div>
    )
}