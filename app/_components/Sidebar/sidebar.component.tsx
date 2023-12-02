"use client";

import { useMemo } from "react";
import { cn } from "@/app/_lib/utils";
import { getDashboardNav } from "@/app/_lib/routes/routes";
import { Disclosure } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
    const pathname = usePathname();

    const subNav = useMemo(() => getDashboardNav(), []);

    return (
        <>
            {/* <div className=""> */}
            <Disclosure
                as="div"
                className="hidden md:block md:fixed min-w-[300px] left-0 top-4 bg-slate-50 dark:bg-gray-800 shadow h-screen z-10"
            >
                {({ open }) => (
                    <nav className="mt-16">
                        <Disclosure.Button>
                            <div
                                className={cn(
                                    "flex justify-center px-2 sm:px-4 md:px-6 py-2 dark:text-white"
                                )}
                            >
                                Dashboard
                                <span className="mx-2 text-lg font-semibold tracking-widest text-gray-900 uppercase dark:text-white">
                                    <ChevronRightIcon
                                        className={cn(
                                            "block h-6 w-6 duration-200",
                                            open
                                                ? "transition-all rotate-90 "
                                                : ""
                                        )}
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                        </Disclosure.Button>
                        <div
                            className={cn(
                                " bg-slate-50 dark:bg-gray-800 h-screen transition-all duration-200 ease-in-out",
                                open ? "ml-14 relative w-60" : "invisible w-0"
                            )}
                        >
                            <Disclosure.Panel
                                as="ul"
                                role="list"
                                className={cn(
                                    "flex flex-col sm:pl-4 dark:text-white pt-2 text-sm",
                                    open ? "delay-150" : "hidden"
                                )}
                            >
                                {subNav.map((item) => (
                                    <li key={item.name} className="px-2 py-1">
                                        <a
                                            href={item.href}
                                            className={cn(
                                                pathname.includes(item.current)
                                                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                    : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100",
                                                "block px-2 py-1 rounded-md text-base font-medium"
                                            )}
                                            aria-current={
                                                pathname.includes(item.current)
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </Disclosure.Panel>
                        </div>
                    </nav>
                )}
            </Disclosure>

            {/* // </nav> */}
            {/* // </div> */}
        </>
    );
}
