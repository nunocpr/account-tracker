"use client";
import OptionsSelect from "./OptionsSelect.component";
import CategoryComboBox from "./CategoryComboBox.component";
import { addTransaction } from "@/app/_lib/db/transactionFunctions";
import { notifyError, notifySuccess } from "@/app/_lib/toast/toastFunctions";
import { IMainCategory } from "@/app/_types/mainCategories";

export default function AddTransaction({
    mainCategories,
}: {
    mainCategories: IMainCategory[];
}) {
    const handleSubmit = async (data: FormData) => {
        try {
            const res = await addTransaction(data);
            if (res.ok) {
                notifySuccess("Transaction added successfully");
            } else {
                notifyError("Something went wrong. Please try again");
            }
        } catch (error) {
            notifyError("Something went wrong. Please try again");
        }
    };

    return (
        <form action={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 dark:text-white">
                        Transactions
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Fill the transaction details below to add a new
                        transaction.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium leading-6 dark:text-white"
                            >
                                Amount
                            </label>
                            <div className="mt-2">
                                <div className="pr-4 flex rounded-md bg-white dark:bg-white/5 shadow ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 text-gray-500 font-medium">
                                    <span className="flex pl-4 select-none items-center text-gray-500 sm:text-sm">
                                        €
                                    </span>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="flex-1 pr-3 border-0 bg-transparent py-1.5 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                        aria-required
                                        placeholder="12.50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <OptionsSelect
                                options={[
                                    { name: "Expense" },
                                    { name: "Income" },
                                ]}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <CategoryComboBox
                                mainCategories={mainCategories}
                                name={"Main Categories"}
                            />
                        </div>

                        <div className="sm:col-span-3">
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
                                    id="description"
                                    placeholder="Write a small description for the transaction"
                                    className="block w-full rounded-md border-0 bg-white dark:bg-white/5 shadow py-1.5 text-gray-500
                                    font-medium dark:text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
