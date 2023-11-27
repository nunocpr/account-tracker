export interface ITransaction {
    id: string;
    type: string;
    amount: number;
    description: string | null;
    mainCategoryId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TTransaction = ITransaction | null;
