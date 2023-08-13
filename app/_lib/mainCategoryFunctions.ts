interface IMainCategory {
    id: string;
    name: string;
    userId: string;
}


export const addMainCategory = (mainCategory: IMainCategory) => {
    try {
        fetch('/api/mainCategory/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mainCategory)
        });
    } catch (e) {
        console.log(e);
    }
}

export const editMainCategory = (mainCategory: IMainCategory) => {
    try {
        fetch('/api/mainCategory/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mainCategory)
        });
    } catch (e) {
        console.log(e);
    }
}

export const removeMainCategory = (mainCategory: IMainCategory) => {
    try {
        fetch('/api/mainCategory/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mainCategory)
        });
    } catch (e) {
        console.log(e);
    }
}