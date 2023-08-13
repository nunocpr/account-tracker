'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

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

export default function MultiSelect() {
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
        <Listbox as="div" className="space-y-4" multiple>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">
                        Assigned to
                    </Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="w-full py-2 pl-3 pr-10 text-left rounded-md bg-white border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm">
                            <span className="flex items-center space-x-4">
                                {selectedPeople.map((person) => (
                                    <div className="flex" key={person.id}>
                                        <img
                                            src={person.avatar}
                                            alt=""
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span className="ml-3 block truncate">
                                            {person.name}
                                        </span>
                                    </div>
                                )
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
                                className="absolute w-full py-1 mt-2 space-y-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                                {people.map(person => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `${active
                                                ? 'text-white bg-indigo-600'
                                                : 'text-gray-900'
                                            }
                                                cursor-pointer select-none relative `
                                        }
                                        value={person}
                                    >
                                        {({ active, selected }) => (
                                            <>
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

                                                {selectedPeople.length > 0 && selectedPeople.some(p => p.id === person.id) && !active && (
                                                    <span className="text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <CheckIcon
                                                            className="w-5 h-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                )}
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