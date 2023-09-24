'use client'
import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { cn } from '@/app/_lib/utils';

let people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

export default function ComboMultiSelect() {
    let [query, setQuery] = useState('')
    let [activePersons, setActivePersons] = useState([people[2], people[3]])

    console.log(activePersons)

    return (
        <div className="space-y-1">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log(e.currentTarget)
                    console.log([...new FormData(e.currentTarget).entries()])
                }}
            >
                <Combobox value={activePersons} onChange={(v) => setActivePersons(v)} name="people" multiple>
                    <Combobox.Label className="block text-sm font-medium leading-5 text-gray-800">
                        Assigned to
                    </Combobox.Label>

                    <div className="relative mt-1">
                        <span className="inline-block w-full rounded-md shadow-sm">
                            <div className="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 dark:text-white border border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white dark:focus:border-white focus:border-black focus:outline-none sm:text-sm py-1 pl-2 pr-10 text-left transition duration-150 ease-in-out sm:leading-5">
                                <span className="flex flex-wrap gap-2">
                                    {activePersons.map((person, i) => (
                                        <span
                                            key={i}
                                            className="flex cursor-pointer items-center gap-1 rounded border border-1 border-gray-800 dark:border-white font-semibold px-2 py-0.5 hover:border-amber-600 dark:hover:border-amber-400 group transition-colors duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                setActivePersons((existing) => existing.filter((p) => p !== person))
                                            }}
                                        >
                                            <span>{person.name}</span>
                                            <svg
                                                className="h-4 w-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </span>
                                    ))}
                                    <Combobox.Input
                                        onChange={(event) => setQuery(event.target.value)}
                                        className="bg-transparent py-2 rounded-sm outline outline-1 outline-gray-800 dark:outline-gray-200 pl-3 focus:ring-0 text-gray-800 dark:text-white focus-visible:outline-amber-400 transition-all duration-200"
                                        placeholder="Search..."
                                    />
                                </span>
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Combobox.Button>
                            </div>
                        </span>

                        <div className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg">
                            <Combobox.Options className="shadow-xs max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-amber-500 rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
                                {
                                    people
                                        .filter((person) => person.name.toLowerCase().includes(query.toLowerCase()))
                                        .map((person, i) => (
                                            <Combobox.Option
                                                key={i}
                                                value={person}
                                                className={({ active }) => {
                                                    return cn(
                                                        'relative cursor-default select-none py-2 pl-6 pr-9 focus:outline-none',
                                                        active ? 'bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-white' : 'text-gray-800 dark:text-white'
                                                    )
                                                }}
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        <span
                                                            className={cn(
                                                                'block truncate',
                                                                selected ? 'font-bold ' : 'font-normal'
                                                            )}
                                                        >
                                                            {person.name}
                                                        </span>
                                                        {selected && (
                                                            <span
                                                                className={cn(
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                    active ? 'text-amber-400 dark:text-white' : 'text-amber-400'
                                                                )}
                                                            >
                                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                }
                            </Combobox.Options>
                        </div>
                    </div>
                </Combobox>
                <button className="mt-2 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Submit
                </button>
            </form>
        </div>
    )
}