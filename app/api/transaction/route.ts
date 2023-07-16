import { NextRequest, NextResponse } from 'next/server'
import prisma from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';


export async function GET(request: Request) {
    // const session = await getServerSession(authOptions)

    // return NextResponse.json({
    //     authenticated: !!session,
    //     session,
    // })
    try {
        // const transactions = await prisma?.transaction.findMany();
        return new NextResponse(JSON.stringify({ derp: "heh" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }

}

// export async function POST(request: NextRequest) {
//     try {
//         const json: Prisma.TransactionCreateInput = await request.json();

//         // validate json
//         if (
//             typeof json.type !== 'string' ||
//             typeof json.amount !== 'number' ||
//             (json.description && typeof json.description !== 'string')
//         ) {
//             return new NextResponse("Invalid data format", { status: 400 });
//         }

//         // sanitize json
//         const transactionData = {
//             type: sanitizeString(json.type),
//             amount: sanitizeNumber(json.amount),
//             description: json.description && sanitizeString(json.description),
//             user: {
//                 connectOrCreate: {
//                     where: { id: 1 },
//                     create: { name: 'temp-user-name' },
//                 },
//             },
//         };

//         const transaction = await prisma?.transaction.create({
//             data: {
//                 type: transactionData.type,
//                 amount: transactionData.amount,
//                 description: transactionData.description,
//                 user: {
//                     connectOrCreate: {
//                         where: { id: "the_id" },
//                         create: { id: "the_id", email: 'temp-user-email', name: 'temp-user-name' },
//                     },
//                 },
//             },
//         });

//         if (!transaction) {
//             return new NextResponse("Failed to create transaction", { status: 500 });
//         }

//         return NextResponse.json({ transaction }, { status: 200 });

//     } catch (error) {
//         console.log(error);
//         return new NextResponse("Something went wrong.", { status: 500 });

//     }
// }