import { CustomError } from "./exceptions";
import { sanitizeString } from "./utils";
import { IMainCategory } from "../_types/mainCategories";


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

export const editMainCategory = async (mainCategory: IMainCategory, newMainCategory: string) => {
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
                        mainCategory: sanitizeString(mainCategory.name),
                        newMainCategory: sanitizeString(newMainCategory),
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