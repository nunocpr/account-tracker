import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/app/_lib/utils";

export default function Example({ options }: { options: { name: string }[] }) {
    const [selected, setSelected] = useState(options[0]);

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 dark:text-white">
                        Type
                    </Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button className="block w-full rounded-md border-0 bg-white dark:bg-white/5 shadow py-1.5 text-gray-500 dark:text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 font-medium">
                            <span className="block truncate text-left pl-3">
                                {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 shadow py-1.5 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option, i) => (
                                    <Listbox.Option
                                        key={i}
                                        className={({ active }) =>
                                            cn(
                                                "relative cursor-default select-none py-2 pl-6 pr-9 focus:outline-none group",
                                                active
                                                    ? "bg-gray-200 dark:bg-gray-600 dark:text-white"
                                                    : "dark:text-white"
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={cn(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "block truncate text-gray-500 dark:text-white"
                                                    )}
                                                >
                                                    {option.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={cn(
                                                            active
                                                                ? "text-gray-500 dark:text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
