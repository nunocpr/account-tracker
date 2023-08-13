interface ITransaction {
    id: string,
    type: string,
    amount: number,
    description: string | null,
    mainCategoryId: string | null,
    subCategoryId: string | null,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}

export const addTransaction = (transaction: ITransaction) => {
    try {
        fetch('/api/transaction/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
    } catch (e) {
        console.log(e);
    }
}

export const editTransaction = (transaction: ITransaction) => {
    try {
        fetch('/api/transaction/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
    } catch (e) {
        console.log(e);
    }
}

export const removeTransaction = (transaction: ITransaction) => {
    try {
        fetch('/api/transaction/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
    } catch (e) {
        console.log(e);
    }
}