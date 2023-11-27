import { headers } from "next/headers";
import ComboMultiSelect from "./ComboMultiSelect.component";
import { baseURL } from "@lib/constants";

export default async function AddTransaction() {
    const res = await fetch(baseURL + "/api/mainCategory", {
        method: "GET",
        headers: Object.fromEntries(headers()),
        next: {
            tags: ["mainCategory"],
        },
    });

    const { mainCategories } = await res.json();

    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">
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
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Amount
                            </label>
                            <div className="mt-2">
                                <div className="pr-4 flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <span className="flex pl-4 select-none items-center text-gray-500 sm:text-sm">
                                        €
                                    </span>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="flex-1 pr-3 border-0 bg-transparent py-1.5 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                        aria-required
                                        placeholder="12.50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Type
                            </label>
                            <div className="mt-2">
                                <select
                                    id="type"
                                    name="type"
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                                    required
                                    aria-required
                                    defaultValue={"Expense"}
                                >
                                    <option>Expense</option>
                                    <option>Income</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <ComboMultiSelect
                                mainCategories={mainCategories}
                                name={"Main Categories"}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Write a small description for the transaction"
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
