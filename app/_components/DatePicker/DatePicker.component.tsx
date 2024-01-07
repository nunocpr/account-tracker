"use client";
import { cn } from "@/app/_lib/utils";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    format,
    addMonths,
    subMonths,
    getMonth,
    setMonth,
    startOfWeek,
    endOfWeek,
    getYear,
    setYear,
} from "date-fns";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DatePickerComponent = () => {
    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState<number | Date>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);

    // Get the first day of the first week of the current month
    const startOfCalendar = startOfWeek(start, { weekStartsOn: 0 });

    // Get the last day of the last week of the current month
    const endOfCalendar = endOfWeek(end, { weekStartsOn: 0 });

    // Combine days of the previous month, current month, and next month
    const daysInCalendar = eachDayOfInterval({
        start: startOfCalendar,
        end: endOfCalendar,
    }).map((day) => ({
        date: day,
        isSelected: isSameDay(day, selectedDate),
        isToday: isSameDay(day, new Date()),
        isCurrentMonth: isSameMonth(day, selectedDate),
    }));

    const handlePrevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    const handleInputClick = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDayClick = (day: Date) => {
        setSelectedDate(day);
        // setIsCalendarOpen(false);
    };

    const handleMonthClick = () => {
        setIsMonthDropdownOpen(!isMonthDropdownOpen);
    };
    const handleYearClick = () => {
        setIsYearDropdownOpen(!isMonthDropdownOpen);
    };

    const years = Array.from(
        { length: 6 },
        (_, index) => new Date().getFullYear() - 4 + index
    );

    return (
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14 relative" ref={calendarRef}>
                <input
                    type="text"
                    value={format(selectedDate, "dd/MM/yyyy")}
                    readOnly
                    onClick={handleInputClick}
                    className="p-2 border rounded-md text-gray-600 focus:outline-none focus:ring focus:border-blue-300"
                />
                {isCalendarOpen && (
                    <>
                        <div
                            className="fixed top-0 left-0 w-full h-full z-0"
                            onClick={() => {
                                setIsCalendarOpen(false);
                            }}
                        />
                        <div className="absolute ml-20 bg-white p-4 rounded-md z-10 shadow-md">
                            <div className="flex items-center">
                                <h2 className="flex-auto text-sm font-semibold">
                                    <button
                                        type="button"
                                        className={cn(
                                            isMonthDropdownOpen &&
                                                "text-indigo-600",
                                            "w-full flex items-center justify-center text-gray-500 hover:text-indigo-600"
                                        )}
                                        onClick={handleMonthClick}
                                    >
                                        {format(selectedDate, "MMMM")}
                                    </button>
                                    {isMonthDropdownOpen && (
                                        <div className="absolute mt-2 bg-white rounded-md shadow-md overflow-hidden">
                                            <div
                                                className="fixed top-0 left-0 w-full h-full z-0"
                                                onClick={() => {
                                                    setIsMonthDropdownOpen(
                                                        false
                                                    );
                                                }}
                                            />
                                            <div className="grid grid-cols-1 sm:grid-cols-3 min-w-40 sm:min-w-72">
                                                {months.map((month, index) => {
                                                    const currentMonth =
                                                        getMonth(selectedDate);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cn(
                                                                currentMonth ===
                                                                    index
                                                                    ? "text-indigo-600"
                                                                    : "text-gray-400",
                                                                "px-3 py-2 cursor-pointer hover:bg-gray-100 border-[1px] border-gray-200 z-10"
                                                            )}
                                                            onClick={() => {
                                                                setSelectedDate(
                                                                    (
                                                                        previousDate
                                                                    ) =>
                                                                        setMonth(
                                                                            previousDate,
                                                                            index
                                                                        )
                                                                );
                                                                setIsMonthDropdownOpen(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            {month}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </h2>
                                <h2 className="flex-auto text-sm font-semibold">
                                    <button
                                        type="button"
                                        className={cn(
                                            isYearDropdownOpen &&
                                                "text-indigo-600",
                                            "w-full flex items-center justify-center text-gray-500 hover:text-indigo-600"
                                        )}
                                        onClick={handleYearClick}
                                    >
                                        {format(selectedDate, "yyyy")}
                                    </button>
                                    {isYearDropdownOpen && (
                                        <div className="absolute mt-2 bg-white rounded-md shadow-md overflow-hidden">
                                            <div
                                                className="fixed top-0 left-0 w-full h-full z-0"
                                                onClick={() => {
                                                    setIsYearDropdownOpen(
                                                        false
                                                    );
                                                }}
                                            />
                                            <div className="grid grid-cols-1 sm:grid-cols-3 min-w-44 sm:min-w-72">
                                                {years.map((year, index) => (
                                                    <div
                                                        key={index}
                                                        className={cn(
                                                            getYear(
                                                                selectedDate
                                                            ) === year
                                                                ? "text-indigo-600"
                                                                : "text-gray-400",
                                                            "px-3 py-2 cursor-pointer hover:bg-gray-100 border-[1px] border-gray-200 z-10"
                                                        )}
                                                        onClick={() => {
                                                            setSelectedDate(
                                                                (
                                                                    previousDate
                                                                ) =>
                                                                    setYear(
                                                                        previousDate,
                                                                        year
                                                                    )
                                                            );
                                                            setIsYearDropdownOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        {year}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </h2>
                                <button
                                    type="button"
                                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-indigo-600"
                                    onClick={handlePrevMonth}
                                >
                                    <span className="sr-only">
                                        Previous month
                                    </span>
                                    <ChevronLeftIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-indigo-600"
                                    onClick={handleNextMonth}
                                >
                                    <span className="sr-only">Next month</span>
                                    <ChevronRightIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <div className="mt-2 grid grid-cols-7 text-sm">
                                {daysInCalendar.map((day, dayIdx) => (
                                    <div
                                        key={dayIdx}
                                        className={cn(
                                            dayIdx > 6 &&
                                                "border-t border-gray-200",
                                            "py-2"
                                        )}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDayClick(day.date)
                                            }
                                            className={cn(
                                                day?.isSelected && "text-white",
                                                !day?.isSelected &&
                                                    day?.isToday &&
                                                    "text-indigo-600",
                                                !day?.isSelected &&
                                                    !day?.isToday &&
                                                    day?.isCurrentMonth &&
                                                    "text-gray-900",
                                                !day?.isSelected &&
                                                    !day?.isToday &&
                                                    !day?.isCurrentMonth &&
                                                    "text-gray-400",
                                                day?.isSelected &&
                                                    day?.isToday &&
                                                    "bg-indigo-600",
                                                day?.isSelected &&
                                                    !day?.isToday &&
                                                    "bg-gray-900",
                                                !day?.isSelected &&
                                                    "hover:bg-gray-200",
                                                (day?.isSelected ||
                                                    day?.isToday) &&
                                                    "font-semibold",
                                                "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                                            )}
                                        >
                                            <time
                                                dateTime={day?.date.toDateString()}
                                            >
                                                {day.date.getDate() || ""}
                                            </time>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DatePickerComponent;
