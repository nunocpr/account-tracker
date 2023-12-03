"server only";
// prismaClient.ts
import {
    PrismaClient as GeneratedPrismaClient,
    TransactionType,
} from "@prisma/client";

// const prisma = new GeneratedPrismaClient();
const globalForPrisma = global as unknown as { prisma: GeneratedPrismaClient };
const devDB = process.env.DATABASE_DEV_URL;
const prodDB = process.env.DATABASE_URL;

const prisma =
    globalForPrisma.prisma ||
    new GeneratedPrismaClient({
        // log: ["query", "info", "warn", "error"],
        datasourceUrl: process.env.NODE_ENV !== "production" ? devDB : prodDB,
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma, TransactionType };
