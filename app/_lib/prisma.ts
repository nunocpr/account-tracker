"server only";
// prismaClient.ts
import {
    PrismaClient as GeneratedPrismaClient,
    TransactionType,
} from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: GeneratedPrismaClient };

const prisma =
    globalForPrisma.prisma ||
    new GeneratedPrismaClient({
        // log: ["query", "info", "warn", "error"],
        datasources: {
            db: {
                url:
                    process.env.NODE_ENV !== "production"
                        ? process.env.MONGODB_DEV_URI
                        : process.env.MONGODB_URI,
            },
        },
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma, TransactionType };
