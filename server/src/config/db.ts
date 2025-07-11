import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB() {
    try {
        await prisma.$connect();
        console.log("✅ Connected to the database");
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1); // Exit if the connection fails
    }
}

connectDB();

export default prisma;
