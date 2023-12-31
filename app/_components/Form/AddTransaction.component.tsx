"use client";
import OptionsSelect from "./OptionsSelect.component";
import CategoryComboBox from "./CategoryComboBox.component";
import { addTransaction } from "@lib/db/transactionFunctions";
import { notifyError, notifySuccess } from "@lib/toast/toastFunctions";
import { IMainCategory } from "@appTypes/mainCategories";
import { FormEvent, useRef } from "react";

export default function AddTransaction({
    mainCategories,
    onClose,
}: {
    mainCategories: IMainCategory[];
    onClose?: () => void;
}) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const res = await addTransaction(data);
            if (res.ok) {
                notifySuccess("Transaction added successfully");
                if (formRef.current) {
                    formRef.current.reset();
                }
                if (onClose) {
                    onClose();
                }
            } else {
                notifyError("Something went wrong. Please try again");
            }
        } catch (error) {
            notifyError("Something went wrong. Please try again");
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 dark:text-white">
                        New Transaction
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Fill the transaction details below to add a new
                        transaction.
                    </p>

                    <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-6 @container">
                        <div className="col-span-6 @md:col-span-3">
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium leading-6 dark:text-white"
                            >
                                Amount
                            </label>
                            <div className="mt-2">
                                <div className="pr-4 flex rounded-md bg-white dark:bg-white/5 shadow ring-1 ring-inset ring-white/10 focus-within:ring-1 focus-within:ring-inset focus-within:ring-amber-500 text-gray-500 font-medium">
                                    <span className="flex pl-4 select-none items-center text-gray-500 sm:text-sm">
                                        €
                                    </span>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="flex-1 pr-3 border-0 bg-transparent py-1.5 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete="off"
                                        required
                                        aria-required
                                        placeholder="12.50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6 @md:col-span-3">
                            <OptionsSelect
                                options={[
                                    { name: "Expense" },
                                    { name: "Income" },
                                ]}
                            />
                        </div>

                        <div className="col-span-6 @md:col-span-3">
                            <CategoryComboBox
                                mainCategories={mainCategories}
                                name={"Main Categories"}
                            />
                        </div>

                        <div className="col-span-6 @md:col-span-3">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 dark:text-white"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="description"
                                    autoComplete="off"
                                    id="description"
                                    placeholder="Write a small description for the transaction"
                                    className="block w-full rounded-md border-0 bg-white dark:bg-white/5 shadow py-1.5 text-gray-500
                                    font-medium dark:text-white ring-1 ring-inset ring-white/10 focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
