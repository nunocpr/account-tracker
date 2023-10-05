'use client'
import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { cn } from '@/app/_lib/utils';
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { IMainCategory } from '@/app/_types/mainCategories';
import { editMainCategory, removeMainCategory } from '@/app/_lib/mainCategoryFunctions';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '@/app/_lib/toastFunctions';
import { useLocalStorage } from '@/app/_lib/hooks';


interface IComboMultiSelectProps {
    mainCategories: IMainCategory[];
}

export default function ComboMultiSelect({ mainCategories }: { mainCategories: IComboMultiSelectProps }) {

    const router = useRouter();

    const [activeCategories, setActiveCategories] = useLocalStorage<IMainCategory[]>('categoryPreferences', []);
    const [editingCategory, setEditingCategory] = useState<IMainCategory | null>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');

    const handleCategoryClick = (category: IMainCategory) => {
        setActiveCategories((existing) => {
            const categoryExists = existing.find((cat) => cat.id === category.id);
            if (categoryExists) {
                return existing.filter((cat) => cat.id !== category.id);
            } else {
                return [...existing, category];
            }
        });
    };

    const handleCategoryDelete = async (category: IMainCategory) => {
        const confirm = window.confirm('Are you sure you want to delete the Category ' + category.name + ' ?')

        if (confirm) {
            setIsLoading(true);
            try {
                const response = await removeMainCategory(category.id);

                if (response.ok) {
                    setActiveCategories((existing) => existing.filter(cat => cat.name !== category.name));
                    notifySuccess('Category has been successfully removed.');

                } else {

                    notifyError('Failed to remove category.')

                }
            } catch (e) {

                notifyError('Error while deleting category.');
                console.log('Error deleting category:', e);

            } finally {

                router.refresh();
                setIsLoading(false);

            }

        }

    };

    const handleCategoryEdit = async (category: IMainCategory, newCategoryName: string) => {

        if (newCategoryName === '' || category.name === newCategoryName) {
            setEditingCategory(null);
            return;
        }

        setIsLoading(true);

        try {

            const response = await editMainCategory(category, newCategoryName);

            if (response.ok) {
                setActiveCategories((existing) => existing.filter(cat => cat.name !== category.name));

                notifySuccess('Category has been successfully updated.');

            } else {

                notifyError('Failed to edit category.')

            }


        } catch (e) {

            notifyError('Error while editing category.');
            console.log('Error editing category:', e);

        } finally {

            router.refresh();
            setIsLoading(false);

        }

    };

    return (
        <div className="space-y-1">
            {/* 
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e.currentTarget);
                    console.log([...new FormData(e.currentTarget).entries()]);
                }}
            > */}

            <Combobox
                value={activeCategories}
                by="id"
                onChange={(val) => setActiveCategories(val.sort((a: any, b: any) => a.name.localeCompare(b.name)))}
                name="categories"
                multiple
            >
                <Combobox.Label
                    htmlFor='searchCategory'
                    className="block text-sm font-medium leading-5 text-gray-800 dark:text-white"
                >
                    Categories
                </Combobox.Label>

                <div className="relative mt-1">
                    <span className="inline-block w-full rounded-md shadow-sm">
                        <div className="relative w-full cursor-default rounded-md shadow-sm border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:ring-1 focus:ring-black dark:focus:ring-white dark:focus:border-white focus:border-black focus:outline-none sm:text-sm py-1 pl-2 pr-10 text-left transition duration-150 ease-in-out sm:leading-5">
                            <span className="flex flex-wrap gap-2 space-x-2">
                                <Combobox.Input
                                    id='searchCategory'
                                    onChange={(event) => setQuery(event.target.value)}
                                    className="py-2 pl-3 rounded-sm outline outline-1 outline-gray-300 dark:outline-gray-500  text-gray-800 dark:text-white bg-transparent focus-visible:outline-amber-700 dark:focus-visible:outline-amber-400 transition-all duration-200"
                                    displayValue={(_) => query}
                                    placeholder="Search..."
                                />
                                {activeCategories.map((category: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex cursor-pointer items-center  rounded border border-1 border-gray-300 dark:border-gray-500 font-semibold px-2 hover:border-amber-700 dark:hover:border-amber-400 group transition-all duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setActiveCategories((existing) => existing.filter((c) => c !== category));
                                        }}
                                    >
                                        <span className="break-all line-clamp-2 align-middle leading-normal px-2 text-gray-600 dark:text-white">{category.name}</span>
                                        <svg
                                            className="h-4 w-4 text-gray-600 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                ))}
                            </span>
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Combobox.Button>
                        </div>
                    </span>

                    <div className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg">
                        <Combobox.Options className="shadow-xs max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-amber-500 border border-gray-100 dark:border-gray-600 rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
                            {mainCategories.mainCategories
                                .filter((category: IMainCategory) => category.name.toLowerCase().includes(query.toLowerCase())) // filters based on query
                                .sort((a: any, b: any) => a.name.localeCompare(b.name)) // sorts categories alphabetically
                                .map((category: IMainCategory, i: number) => (
                                    <Combobox.Option
                                        key={i}
                                        value={category}
                                        className={({ active }) => {
                                            return cn(
                                                'relative cursor-default select-none py-2 pl-6 pr-9 focus:outline-none group',
                                                active ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white' : 'text-gray-800 dark:text-white',
                                                category === editingCategory && 'pointer-events-none'
                                            );
                                        }}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {({ active, selected }) => (
                                            <div className="flex justify-between pl-4">

                                                {
                                                    selected && (
                                                        <span
                                                            className={cn(
                                                                'absolute inset-y-0 left-2 flex items-center pr-4',
                                                                active ? 'text-amber-400 dark:text-white' : 'text-amber-400'
                                                            )}
                                                        >
                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    )
                                                }

                                                {
                                                    editingCategory === category ? (
                                                        <input
                                                            type="text"
                                                            className={cn("pl-2 bg-transparent border border-gray-300 text-white", isLoading && 'pointer-events-none')}
                                                            defaultValue={category.name}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                                            onBlur={() => {
                                                                !isLoading && handleCategoryEdit(category, newCategoryName);
                                                                setEditingCategory(null);
                                                            }}
                                                            placeholder="Edit Category Name"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span className={cn('block truncate', selected ? 'font-bold ' : 'font-normal')}>
                                                            {category.name}
                                                        </span>
                                                    )
                                                }
                                                <div className="flex space-x-4">

                                                    <PencilSquareIcon
                                                        className="h-6 w-6 cursor-pointer text-indigo-600 dark:group-hover:text-indigo-200"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();

                                                            if (!isLoading) {

                                                                if (editingCategory) {

                                                                    setEditingCategory(null);

                                                                } else {

                                                                    setEditingCategory(category);

                                                                }
                                                            }

                                                        }}
                                                    />

                                                    <TrashIcon
                                                        className="h-6 w-6 cursor-pointer text-red-500 dark:group-hover:text-red-200"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCategoryDelete(category);
                                                        }}
                                                    />
                                                </div>


                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))}
                        </Combobox.Options>
                    </div>
                </div>
            </Combobox>
            {/* <button className="mt-2 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Submit
            </button>
            </form> */}

        </div >
    );
};