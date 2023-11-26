'use client'
import Link from 'next/link';
import Profile from '@components/Header/Profile.component';
import ThemeSwitcher from '@components/Header/ThemeSwitcher.component';
import PrimaryButton from '@components/Common/PrimaryButton.component';
import { cn } from '@lib/utils';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { handleDeleteUser, handleLogout } from '@/app/_lib/auth/authFunctions';
import { ChartBarSquareIcon, Bars3Icon, BellIcon, XMarkIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { getNav, getSubNav } from '@lib/routes/routes';
import Image from 'next/image';

export default function Header({ session }: { session: any }) {
    const pathname = usePathname();
    const nav = useMemo(() => getNav(), [pathname]);
    const subNav = useMemo(() => getSubNav(), [pathname]);

    const user = useMemo(() => session?.user, [session]);

    return (
        <Disclosure as="nav" className="bg-slate-50 dark:bg-gray-800 shadow-sm dark:shadow-gray-600 z-20 fixed left-0 right-0">
            {({ open }) => (
                <>
                    <div className="mx-auto w-screen max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex">
                                {/* Mobile menu button */}
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                {/* Logo */}
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/" aria-label="Home">
                                        <ChartBarSquareIcon className="h-10 w-auto text-indigo-600 hover:text-indigo-500 dark:text-white dark:hover:text-indigo-300 cursor-pointer" />
                                    </Link>
                                </div>
                                {/* Main Navigation */}
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {session && nav.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                pathname.includes(item.current) ? 'bg-slate-50 hover:bg-slate-200 dark:bg-indigo-500' : 'dark:bg-gray-800 dark:hover:bg-gray-900',
                                                'rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200'
                                            )}
                                            aria-current={pathname.includes(item.current) ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>

                            </div>
                            {
                                session ?
                                    <div className="flex items-center">
                                        {/* Account Options (new transaction, notifications, user account, etc) */}
                                        <div className="flex-shrink-0">
                                            <PrimaryButton buttonText="New Transaction">
                                                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                            </PrimaryButton>
                                        </div>


                                        <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                            <ThemeSwitcher />
                                            <button
                                                type="button"
                                                className="ml-1 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            <Profile user={user} />
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center">
                                        {/* LOGIN / REGISTER BUTTON */}
                                        <ThemeSwitcher />
                                        <div className="flex-shrink-0 ml-4 hidden md:block">
                                            <Link href="/register" className="mr-3">
                                                <PrimaryButton>
                                                    <UserCircleIcon className="-ml-0.5 h-7 w-7" aria-hidden="true" />
                                                    Login / Register
                                                </PrimaryButton>
                                            </Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Disclosure.Panel className="md:hidden flex flex-col">
                        {/* Sub Navigation */}
                        <Disclosure as="div" className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button
                                        className="mb-2 flex w-full items-center text-start dark:text-white space-x-2"
                                    >
                                        <p>Dashboard</p>
                                        <ChevronRightIcon className={cn(open ? 'rotate-90' : '', "w-4 h-4 transform duration-200")} />
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        {session && subNav.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={cn(
                                                    pathname.includes(item.current) ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100",
                                                    "block ml-2 px-2 py-1 rounded-md text-base font-medium"
                                                )}
                                                aria-current={pathname.includes(item.current) ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                        {!session && <p className="pl-8 dark:text-white text-sm">You must be logged in to access your dashboard.</p>}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/* User Settings */}
                        <div className="border-y border-gray-200 dark:border-gray-700 pb-3 pt-4">
                            {
                                session ?
                                    <>
                                        <div className="flex items-center px-5 sm:px-6">
                                            <div className="flex-shrink-0">
                                                {user?.image && (<Image
                                                    className="h-8 w-8 rounded-full"
                                                    width={32}
                                                    height={32}
                                                    src={user?.image}
                                                    alt="Profile Picture"
                                                />)}
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800 dark:text-white">{user?.name}</div>
                                                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:text-white dark:focus:ring-white"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <div className="mt-3 space-y-1 px-2 sm:px-3">
                                            <Disclosure.Button
                                                className="w-full text-start"
                                            >
                                                <Link
                                                    href="#"
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"

                                                >
                                                    Your Profile
                                                </Link>
                                            </Disclosure.Button>
                                            <Disclosure.Button
                                                className="w-full text-start"
                                            >
                                                <Link
                                                    href="#"
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Settings
                                                </Link>
                                            </Disclosure.Button>
                                            <Disclosure.Button
                                                as="a"
                                                onClick={() => handleLogout()}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                            >
                                                Sign out
                                            </Disclosure.Button>
                                            <Disclosure.Button
                                                as="a"
                                                onClick={() => handleDeleteUser()}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                            >
                                                Delete Account
                                            </Disclosure.Button>
                                        </div>
                                    </>
                                    :
                                    <div className="mt-3 space-y-1 px-2 sm:px-3">
                                        <Disclosure.Button
                                            className="w-full block rounded-md px-3 py-2 text-start text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <Link href="/register" className="mr-3 ">
                                                Login / Register
                                            </Link>
                                        </Disclosure.Button>
                                    </div>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}
