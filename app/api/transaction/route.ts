import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {

    const transactions = await prisma?.transactions.findMany();

    return NextResponse.json({ transactions }, { status: 200 })
}

interface TransactionCreateInput {
    type: string,
    amount: number,
    description?: string,
    mainCategory?: string,
    subCategory?: string,
}

export async function POST(request: NextRequest) {
    try {
        const json: TransactionCreateInput = await request.json();

        const transaction = await prisma?.transactions.create({ data: json });
        return NextResponse.json({ transaction }, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Algo se passou diéb", { status: 501 });

    }
}