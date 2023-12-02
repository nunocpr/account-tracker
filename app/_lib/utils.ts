import { v4 as uuidv4 } from "uuid";
import ms from "ms";
import trim from "validator/lib/trim";
import escape from "validator/lib/escape";

/**
 * Returns the time ago from the timestamp
 *
 * @param {Date} timestamp
 * @param {boolean} timeOnly
 * @returns a string with the time ago
 */
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
    if (!timestamp) return "never";
    return `${ms(Date.now() - new Date(timestamp).getTime())}${
        timeOnly ? "" : " ago"
    }`;
};

/**
 * Returns true if the value is undefined, null, an empty object or an empty string
 *
 * @param val
 * @returns {boolean}
 */
export const isEmpty = (val: any): boolean =>
    val === undefined ||
    val === null ||
    (typeof val === "object" && Object.keys(val).length === 0) ||
    (typeof val === "string" && val.trim().length === 0);

export const sanitizeString = (input: string | FormDataEntryValue) => {
    if (typeof input !== "string") {
        return "";
    }

    const sanitizedValue = trim(escape(input));

    return sanitizedValue;
};

export const sanitizeNumber = (input: FormDataEntryValue | null): number => {
    if (typeof input === "number") {
        return input;
    }

    if (typeof input === "string") {
        const parsedValue = parseFloat(input);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }

    return 0;
};

export const generateSessionToken = () => {
    // Use `randomUUID` if available. (Node 15.6++)
    return uuidv4();
};

export const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000);
};

export const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
