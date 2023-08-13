import { NextRequest, NextResponse } from 'next/server'
import prisma from "@lib/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Transaction } from '@prisma/client';
import { sanitizeNumber, sanitizeString } from '@lib/utils';

const getUserIdFromSession = async (session: {
    user?: {
        name?: string | null,
        email?: string | null,
        image?: string | null,
    }
}) => {
    const email = session?.user?.email;

    if (!email) throw new Error('Email not found');

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user.id;
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/register')
    }

    try {

        const userId = await getUserIdFromSession(session);

        if (!userId) {
            return new NextResponse("Couldn't identify user.", { status: 500 });
        }

        const transaction: Transaction = await request.json();

        const newTransaction = await prisma.transaction.create({
            data: {
                amount: sanitizeNumber(transaction.amount),
                type: sanitizeString(transaction.type),
                mainCategory: transaction.mainCategoryId ? { connect: { id: sanitizeString(transaction.mainCategoryId) } } : undefined,
                subCategory: transaction.subCategoryId ? { connect: { id: sanitizeString(transaction.subCategoryId) } } : undefined,
                description: transaction.description ? sanitizeString(transaction.description) : undefined,
                user: { connect: { id: userId } },
            }
        })

        return NextResponse.json({ newTransaction }, { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse("Something went wrong.", { status: 500 });

    }
}