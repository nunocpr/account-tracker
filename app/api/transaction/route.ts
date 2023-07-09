import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { sanitizeNumber, sanitizeString } from '@/lib/utils';

export async function GET(request: Request) {
    try {
        const transactions = await prisma?.transactions.findMany();
        return new NextResponse(JSON.stringify({ transactions }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }

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

        // validate json
        if (
            typeof json.type !== 'string' ||
            typeof json.amount !== 'number' ||
            json.description && typeof json.description !== 'string' ||
            json.mainCategory && typeof json.mainCategory !== 'string' ||
            json.subCategory && typeof json.subCategory !== 'string'
        ) {
            return new NextResponse("Invalid data format", { status: 400 });
        }

        // sanitize json
        const sanitizedJson = {
            type: sanitizeString(json.type),
            amount: sanitizeNumber(json.amount),
            description: json.description && sanitizeString(json.description),
            mainCategory: json.mainCategory && sanitizeString(json.mainCategory),
            subCategory: json.subCategory && sanitizeString(json.subCategory),
        };

        const transaction = await prisma?.transactions.create({
            data: {
                type: sanitizedJson.type,
                amount: sanitizedJson.amount,
                description: sanitizedJson.description,
                mainCategory: sanitizedJson.mainCategory,
                subCategory: sanitizedJson.subCategory,
            },
        });

        return NextResponse.json({ transaction }, { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse("Something went wrong.", { status: 500 });

    }
}