import { revalidateTag } from "next/cache";
import { CustomError } from "./exceptions";
import { sanitizeString } from "./utils";


export const addMainCategory = async (mainCategory: string) => {
    try {
        const res = await fetch('/api/mainCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: 'add',
                    data: {
                        mainCategory: sanitizeString(mainCategory),
                    }
                }
            )
        });

        return res;
    } catch (e) {
        throw new CustomError('Error adding category');
    }
}

export const editMainCategory = async (mainCategory: string, newMainCategory: string, selected: boolean) => {
    try {
        const res = await fetch('/api/mainCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: 'edit',
                    data: {
                        mainCategory: sanitizeString(mainCategory),
                        newMainCategory: sanitizeString(newMainCategory),
                        selected: !!selected,
                    }
                }
            )
        });

        return res;
    } catch (e) {
        throw new CustomError('Error editing category');
    }
}

export const removeMainCategory = async (mainCategory: string) => {
    try {
        const res = await fetch('/api/mainCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: 'remove',
                    data: {
                        mainCategory: sanitizeString(mainCategory)
                    }
                }
            )
        });

        return res;

    } catch (e) {
        throw new CustomError('Error removing category');
    }
}