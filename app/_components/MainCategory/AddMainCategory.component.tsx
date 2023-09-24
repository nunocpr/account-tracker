'use client'
import { AuthFailedError, AuthRequiredError, CustomError, handleError } from "@/app/_lib/exceptions";
import { addMainCategory } from "@/app/_lib/mainCategoryFunctions";
import { cn } from "@/app/_lib/utils";
import { ChangeEvent, useState } from "react";

export default function AddMainCategory() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await addMainCategory(category);

            if (!res?.ok) {
                alert(res.statusText || 'Something went wrong. Please try again later');
                return;
            }

            setCategory('');

            alert('Category added successfully');

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
        <div className="flex max-w-md my-8">
            <input
                type="text"
                name="add_category"
                onChange={handleChange}
                value={category}
                className="p-2"
            />
            <button
                onClick={onSubmit}
                className={cn(loading ? 'bg-[#ccc]' : 'bg-[#3446eb]', 'px-6 cursor-pointer text-white')}
                disabled={loading}
            >
                {loading ? "loading..." : "Add Category"}
            </button>
        </div>
    )
}