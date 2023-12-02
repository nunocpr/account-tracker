"use client";
import { cn } from "@/app/_lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";
import { useLocalStorage } from "@/app/_lib/hooks";
import { IMainCategory } from "@/app/_types/mainCategories";
import { notifyError, notifySuccess } from "@/app/_lib/toast/toastFunctions";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import {
    editMainCategory,
    removeMainCategory,
} from "@/app/_lib/db/mainCategoryFunctions";
import AddMainCategory from "../MainCategory/AddMainCategory.component";

export default function CategoryComboBox({
    mainCategories,
    name,
}: {
    mainCategories: IMainCategory[];
    name: string;
}) {
    const router = useRouter();

    const [activeCategories, setActiveCategories] = useLocalStorage<
        IMainCategory[]
    >("categoryPreferences", []);
    const [editingCategory, setEditingCategory] =
        useState<IMainCategory | null>(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");

    const handleCategoryClick = (category: IMainCategory) => {
        setActiveCategories((existing) => {
            const categoryExists = existing.find(
                (cat) => cat.id === category.id
            );
            if (categoryExists) {
                return existing.filter((cat) => cat.id !== category.id);
            } else {
                return [...existing, category];
            }
        });
    };

    const handleCategoryDelete = async (category: IMainCategory) => {
        const confirm = window.confirm(
            `Are you sure you want to delete the Category ${category.name}?`
        );

        if (confirm) {
            setIsLoading(true);
            try {
                const response = await removeMainCategory(category.id);

                if (response.ok) {
                    setActiveCategories((existing) =>
                        existing.filter((cat) => cat.name !== category.name)
                    );
                    notifySuccess("Category has been successfully removed.");
                } else {
                    notifyError("Failed to remove category.");
                }
            } catch (e) {
                notifyError("Error while deleting category.");
                console.log("Error deleting category:", e);
            } finally {
                router.refresh();
                setIsLoading(false);
            }
        }
    };

    const handleCategoryEdit = async (
        category: IMainCategory,
        newCategoryName: string
    ) => {
        if (newCategoryName === "" || category.name === newCategoryName) {
            setEditingCategory(null);
            return;
        }

        setIsLoading(true);

        try {
            const response = await editMainCategory(category, newCategoryName);

            if (response.ok) {
                setActiveCategories((existing) =>
                    existing.filter((cat) => cat.name !== category.name)
                );

                notifySuccess("Category has been successfully updated.");
            } else {
                notifyError("Failed to edit category.");
            }
        } catch (e) {
            notifyError("Error while editing category.");
            console.log("Error editing category:", e);
        } finally {
            router.refresh();
            setIsLoading(false);
        }
    };

    return (
        <Combobox
            value={activeCategories}
            by="id"
            onChange={(val) =>
                setActiveCategories(
                    val.sort((a: any, b: any) => a.name.localeCompare(b.name))
                )
            }
            name="categories"
            multiple
        >
            <Combobox.Label
                htmlFor="searchCategory"
                className="block text-sm font-medium leading-6 dark:text-white"
            >
                {name}
            </Combobox.Label>

            <div className="relative mt-2">
                <div className="inline-block w-full rounded-md shadow-sm ">
                    <div className="relative w-full cursor-default rounded-md shadow-sm bg-white dark:bg-white/5 dark:text-white sm:text-sm pl-2 pr-10 text-left transition duration-150 ease-in-out sm:leading-5 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="flex gap-2 space-x-2">
                            <Combobox.Input
                                id="searchCategory"
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                className="py-1.5 w-1/4 rounded-sm text-gray-500 font-medium dark:text-white bg-transparent border-0 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                displayValue={(_) => query}
                                placeholder="Search..."
                            />
                            <div className="divide-x-2 flex flex-wrap">
                                {activeCategories.length <= 2 ? (
                                    activeCategories.map(
                                        (category: any, i: number) => (
                                            <div
                                                key={i}
                                                className="group flex cursor-pointer items-center font-semibold p-1.5 group transition-all duration-200  border-amber-400 hover:bg-gray-500 hover:bg-opacity-10 dark:hover:bg-gray-500 dark:hover:bg-opacity-10"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    setActiveCategories(
                                                        (existing) =>
                                                            existing.filter(
                                                                (c) =>
                                                                    c !==
                                                                    category
                                                            )
                                                    );
                                                }}
                                            >
                                                <span className="break-all line-clamp-2 align-middle leading-normal px-2 text-gray-600 dark:text-white">
                                                    {category.name}
                                                </span>
                                                <svg
                                                    className="h-4 w-4 text-gray-500 group-hover:text-gray-400 transition duration-150 ease-in-out"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <>
                                        {activeCategories
                                            .slice(0, 2)
                                            .map((category: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="group flex cursor-pointer items-center font-semibold p-1.5 group transition-all duration-200  border-amber-400 hover:bg-gray-500 hover:bg-opacity-10 dark:hover:bg-gray-500 dark:hover:bg-opacity-10"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        setActiveCategories(
                                                            (existing) =>
                                                                existing.filter(
                                                                    (c) =>
                                                                        c !==
                                                                        category
                                                                )
                                                        );
                                                    }}
                                                    title={category.name}
                                                >
                                                    <span className="break-all line-clamp-2 align-middle leading-normal px-2 text-gray-600 dark:text-white">
                                                        {category.name}
                                                    </span>
                                                    <svg
                                                        className="h-4 w-4 text-gray-500 group-hover:text-gray-400 transition duration-150 ease-in-out"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </div>
                                            ))}
                                        <div
                                            className="group flex cursor-pointer items-center font-semibold p-1.5 group transition-all duration-200 border-amber-400 hover:bg-gray-500 hover:bg-opacity-10 dark:hover:bg-gray-500 dark:hover:bg-opacity-10"
                                            title={activeCategories
                                                .slice(2)
                                                .map(
                                                    (category: any) =>
                                                        category.name
                                                )
                                                .join(", ")}
                                        >
                                            <span className="break-all line-clamp-2 align-middle leading-normal px-2 text-gray-600 dark:text-white">
                                                {`+ ${
                                                    activeCategories.length -
                                                        2 ===
                                                    1
                                                        ? `${
                                                              activeCategories.length -
                                                              2
                                                          } category`
                                                        : `${
                                                              activeCategories.length -
                                                              2
                                                          } categories`
                                                }`}
                                            </span>
                                            <svg
                                                className="h-4 w-4 text-gray-500 group-hover:text-gray-400 transition duration-150 ease-in-out"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>
                        </span>
                        <Combobox.Button className="absolute right-0 pr-4 pl-12 inset-y-0 flex items-center justify-center">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Combobox.Button>
                    </div>
                </div>

                <div className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-700 shadow-lg z-20">
                    <Combobox.Options className="flex flex-col shadow-xs max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-amber-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500  rounded-md py-6 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
                        <>
                            {mainCategories.length !== 0 ? (
                                mainCategories
                                    .filter((category) =>
                                        category.name
                                            .toLowerCase()
                                            .includes(query.toLowerCase())
                                    )
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                    )
                                    .map((category, i) => (
                                        <Combobox.Option
                                            key={i}
                                            value={category}
                                            className={({ active }) =>
                                                cn(
                                                    "relative cursor-default select-none py-2 pl-6 pr-9 focus:outline-none group",
                                                    active
                                                        ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
                                                        : "text-gray-800 dark:text-white",
                                                    category ===
                                                        editingCategory &&
                                                        "pointer-events-none"
                                                )
                                            }
                                            onClick={() =>
                                                handleCategoryClick(category)
                                            }
                                        >
                                            {({ active, selected }) => (
                                                <div className="flex justify-between pl-4">
                                                    {selected && (
                                                        <span
                                                            className={cn(
                                                                "absolute inset-y-0 left-2 flex items-center pr-4",
                                                                active
                                                                    ? "text-amber-400 dark:text-white"
                                                                    : "text-amber-400"
                                                            )}
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    )}

                                                    {editingCategory ===
                                                    category ? (
                                                        <input
                                                            type="text"
                                                            className={cn(
                                                                "pl-2 bg-transparent border border-gray-300 dark:text-white",
                                                                isLoading &&
                                                                    "pointer-events-none"
                                                            )}
                                                            defaultValue={
                                                                category.name
                                                            }
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            onChange={(e) =>
                                                                setNewCategoryName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            onBlur={() => {
                                                                !isLoading &&
                                                                    handleCategoryEdit(
                                                                        category,
                                                                        newCategoryName
                                                                    );
                                                                setEditingCategory(
                                                                    null
                                                                );
                                                            }}
                                                            placeholder="Edit Category Name"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span
                                                            className={cn(
                                                                "block truncate",
                                                                selected
                                                                    ? "font-bold "
                                                                    : "font-normal"
                                                            )}
                                                        >
                                                            {category.name}
                                                        </span>
                                                    )}
                                                    <div className="flex space-x-4">
                                                        <PencilSquareIcon
                                                            className="h-6 w-6 cursor-pointer text-indigo-600 dark:group-hover:text-indigo-400"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();

                                                                if (
                                                                    !isLoading
                                                                ) {
                                                                    if (
                                                                        editingCategory
                                                                    ) {
                                                                        setEditingCategory(
                                                                            null
                                                                        );
                                                                    } else {
                                                                        setEditingCategory(
                                                                            category
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        />

                                                        <TrashIcon
                                                            className="h-6 w-6 cursor-pointer text-red-500 dark:group-hover:text-red-400"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleCategoryDelete(
                                                                    category
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Combobox.Option>
                                    ))
                            ) : (
                                <Combobox.Option
                                    value=""
                                    className={cn(
                                        "pointer-events-none cursor-default select-none py-2 pl-6 focus:outline-none group dark:text-white"
                                    )}
                                >
                                    There are no {name} associated with your
                                    account
                                </Combobox.Option>
                            )}
                            <div className="w-3/4 border-t border-gray-600 self-center py-2" />
                            <AddMainCategory className="w-3/4 self-center" />
                        </>
                    </Combobox.Options>
                </div>
            </div>
        </Combobox>
    );
}
