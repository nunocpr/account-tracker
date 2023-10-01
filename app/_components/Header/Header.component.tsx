'use client'
import ThemeSwitcher from '@/app/_components/Header/ThemeSwitcher.component'
import { Disclosure } from '@headlessui/react'
import { ChartBarSquareIcon, Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { cn } from '@lib/utils'
import Profile from './Profile.component'
import PrimaryButton from '../Common/PrimaryButton.component';
import Link from 'next/link';
import { handleDeleteUser, handleLogout } from '@/app/_lib/authFunctions';

function getInitials(name: string): string {
    const initials = name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
    return initials;
}

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

// TODO - Get user, navigation and userNav as props
// is user is NOT logged in:
// show login button, hide new transaction + nav + userNav buttons

// After log in, show new transaction + nav + userNav buttons

export default function Header({ session }: { session: any }) {

    const user = session?.user;

    return (
        <Disclosure as="nav" className="bg-slate-50 dark:bg-gray-800 shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                                    <ChartBarSquareIcon className="h-10 w-auto text-indigo-600 hover:text-indigo-500 dark:text-white dark:hover:text-indigo-300 cursor-pointer" />
                                </div>
                                {/* Main Navigation */}
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {session && navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                item.current ? 'bg-slate-50 hover:bg-slate-200 transition-colors duration-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-white' : '',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
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
                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {session && navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={cn(
                                        item.current ? 'dark:bg-gray-900 dark:text-white' : 'text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
                            {
                                session ?
                                    <>
                                        <div className="flex items-center px-5 sm:px-6">
                                            <div className="flex-shrink-0">
                                                {user?.image && <img className="h-10 w-10 rounded-full" src={user?.image} alt="Profile Picture" />}
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
                                            {/* <div className="flex-shrink-0 ml-4 text-white"> */}
                                            <Link href="/register" className="mr-3 ">
                                                Login / Register
                                            </Link>
                                            {/* </div> */}
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
