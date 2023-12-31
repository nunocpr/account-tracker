"server only";
// prismaClient.ts
// import {
//     PrismaClient as GeneratedPrismaClient,
//     TransactionType,
// } from "@prisma/client";
import { PrismaClient, TransactionType } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
    return new PrismaClient().$extends(withAccelerate());
};

declare global {
    // eslint-disable-next-line no-unused-vars
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = global.prisma ?? prismaClientSingleton();

export { prisma, TransactionType };

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

// const prisma = new GeneratedPrismaClient();
// const globalForPrisma = global as unknown as { prisma: GeneratedPrismaClient };
// const devDB = process.env.DATABASE_DEV_URL;
// const prodDB = process.env.DATABASE_URL;
// let prisma: PrismaClientEdge;

// if (process.env.NODE_ENV !== "production") {
//     globalForPrisma.prisma ||
//         new PrismaClientEdge({
//             // log: ["query", "info", "warn", "error"],

//             // datasourceUrl: devDB,
//             errorFormat: "pretty",
//         }).$extends(withAccelerate());
// } else {
//     prisma = new PrismaClientEdge({
//         // log: ["query", "info", "warn", "error"],
//         // datasourceUrl: prodDB,
//         errorFormat: "pretty",
//     });
// }
