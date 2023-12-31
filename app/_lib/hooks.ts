import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        if (typeof window.localStorage !== "undefined") {
            const storedValue = localStorage?.getItem(key);

            return storedValue ? JSON.parse(storedValue) : initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
