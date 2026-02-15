import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("MySQL Database connected successfully");
  } catch (error) {
    console.error("MySQL Database connection failed:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Database disconnection error:", error);
  }
};
