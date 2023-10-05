export interface ITransaction {
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
