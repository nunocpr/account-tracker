'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import AddMainCategory from '../MainCategory/AddMainCategory.component';
import { cn } from '@/app/_lib/utils';


interface Person {
    id: number;
    name: string;
    avatar: string;
}

const people = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Tom Cook',
        avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 5,
        name: 'Tanya Fox',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 6,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 7,
        name: 'Caroline Schultz',
        avatar:
            'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 8,
        name: 'Mason Heaney',
        avatar:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 9,
        name: 'Claudie Smitham',
        avatar:
            'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 10,
        name: 'Emil Schaefer',
        avatar:
            'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

export default function MultiSelect({ mainCategories }: any) {
    console.log(mainCategories)

    const [selectedPeople, setSelectedPeople] = useState<Person[]>([people[0], people[1]]);

    const handlePersonClick = (person: Person) => {
        setSelectedPeople(prevSelectedPeople => {
            const isPersonSelected = prevSelectedPeople.some(p => p.id === person.id);

            if (isPersonSelected) {
                // Remove the person from selectedPeople array
                const updatedPeople = prevSelectedPeople.filter(p => p.id !== person.id);
                return updatedPeople;
            } else {
                // Add the person to selectedPeople array
                const updatedPeople = [...prevSelectedPeople, person];
                return updatedPeople;
            }
        });
    };

    return (
        <div>
            <Listbox as="div" className="max-w-md space-y-4" multiple>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium text-gray-800">
                            Main Categories:
                        </Listbox.Label>
                        <div className="relative mt-1">

                            <Listbox.Button className="w-full py-2 pl-3 pr-10 text-left rounded-md bg-white dark:bg-gray-800 dark:text-white border border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white dark:focus:border-white focus:border-black focus:outline-none sm:text-sm">

                                <span className="flex items-center space-x-4">
                                    {selectedPeople.length > 0 ? selectedPeople.map((person) => (
                                        <div className="flex items-center" key={person.id}>
                                            <img
                                                src={person.avatar}
                                                alt=""
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span className="ml-3 block truncate font-semibold">
                                                {person.name}
                                            </span>
                                        </div>
                                    )
                                    ) : (
                                        <span>
                                            Select a category
                                        </span>
                                    )}
                                </span>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <ChevronUpDownIcon
                                        className="w-5 h-5 text-gray-400"
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
                                <Listbox.Options
                                    static
                                    className="overflow-y-auto absolute w-full py-1 space-y-1 bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                    {people.map(person => (
                                        <Listbox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                `${active
                                                    ? 'text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-500'
                                                    : 'text-gray-900 dark:text-white'
                                                }
                                                cursor-pointer select-none relative `
                                            }
                                            value={person}
                                        >
                                            {({ active }) => (
                                                <>
                                                    {/* Check Icon */}
                                                    {selectedPeople.length > 0 && selectedPeople.some(p => p.id === person.id) && (
                                                        <span
                                                            className={cn(
                                                                "text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-3",
                                                                active && 'text-gray-800 dark:text-indigo-200'
                                                            )}>
                                                            <CheckIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    )}

                                                    {/* Image + Name */}
                                                    <div
                                                        className="flex items-center py-2 pl-10 pr-4"
                                                        onClick={() =>
                                                            handlePersonClick(person)
                                                        }
                                                    >
                                                        <img
                                                            src={person.avatar}
                                                            alt=""
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                        <span
                                                            className={`${selectedPeople
                                                                ? 'font-semibold'
                                                                : 'font-normal'
                                                                } ml-3 block truncate`}
                                                        >
                                                            {person.name}
                                                        </span>
                                                    </div>

                                                    {/* Edit Button */}
                                                    <div className="absolute inset-y-0 right-2 flex items-center justify-center pl-3">
                                                        <PencilSquareIcon
                                                            className={
                                                                cn(
                                                                    "h-6 w-6 text-indigo-600",
                                                                    active && 'text-gray-800 dark:text-indigo-200'
                                                                )
                                                            }
                                                        />
                                                    </div>

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
            <AddMainCategory />
        </div >
    );
}