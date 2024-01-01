"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TransactionType } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";

type TTransaction = {
    type: TransactionType;
    id: string;
    mainCategories: {
        id: string;
        name: string;
        userId: string | null;
        createdAt: Date;
        transactionIds: string[];
    }[];
    amount: number;
    description: string | null;
};

type TransactionKey = keyof TTransaction;

export default function Table({
    transactions,
}: {
    transactions: TTransaction[];
}) {
    const [sortConfig, setSortConfig] = useState({
        column: "amount",
        direction: "ascending",
    });
    const handleSort = (column: TransactionKey) => {
        if (sortConfig.column === column) {
            setSortConfig((prevConfig) => {
                console.log(column);
                console.log(prevConfig);

                return {
                    column,
                    direction:
                        prevConfig.direction === "ascending"
                            ? "descending"
                            : "ascending",
                };
            });
        } else {
            setSortConfig({
                column,
                direction: "ascending",
            });
        }
    };
    const sortedTransactions = useMemo(() => {
        return [...transactions].sort((a, b) => {
            const first = a[sortConfig.column as TransactionKey] ?? "";
            const second = b[sortConfig.column as TransactionKey] ?? "";
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortConfig.direction === "descending" ? -cmp : cmp;
        });
    }, [sortConfig, transactions]);

    // Get all unique keys from transactions in order to create columns
    const uniqueKeys: TransactionKey[] = Array.from(
        new Set(
            transactions.flatMap((obj) => Object.keys(obj)) as TransactionKey[]
        )
    );

    // Create columns from unique keys and remove id column
    const columns = uniqueKeys
        .filter((key) => key !== "id")
        .map((key) => ({
            accessor: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
        }));

    // Helper function to format column values
    const formatColumnValue = useCallback(
        (columnKey: TransactionKey, transaction: TTransaction) => {
            switch (columnKey) {
                case "mainCategories":
                    return transaction.mainCategories
                        .map((category) => category.name)
                        .join(", ");
                case "amount":
                    return `${transaction.amount} €`;
                default:
                    return transaction[columnKey];
            }
        },
        []
    );

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h2 className="text-base font-semibold leading-6">
                        Transactions
                    </h2>
                    <p className="mt-2 text-sm ">
                        A list of the most recent transactions
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    Add Transaction
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 bg-gray-100 dark:bg-gray-900">
                            <thead>
                                <tr>
                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="cursor-pointer px-3 py-3.5 text-center text-sm font-semibold bg-transparent text-gray-500 dark:text-gray-400 hover:dark:text-gray-200 group"
                                            onClick={() =>
                                                handleSort(column.accessor)
                                            }
                                        >
                                            <div className="inline-flex">
                                                {column.header}
                                                <span className="ml-2 flex-none rounded opacity-50 group-hover:opacity-100 group-focus:opacity-100">
                                                    <ChevronDownIcon
                                                        className="ml-2 h-5 w-5 flex-none rounded opacity-30 group-hover:opacity-100 group-focus:opacity-100"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                    {/* Additional header cells can be added here */}
                                    <th className="relative py-3.5 pl-3 pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800">
                                {sortedTransactions.map((transaction, i) => (
                                    <tr key={i}>
                                        {columns.map((column) => (
                                            <td
                                                key={column.accessor}
                                                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium dark:text-gray-00 sm:pl-0 text-center"
                                            >
                                                {formatColumnValue(
                                                    column.accessor,
                                                    transaction
                                                )}
                                            </td>
                                        ))}
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm sm:pr-0 text-center">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
