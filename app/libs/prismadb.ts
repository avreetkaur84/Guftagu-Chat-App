import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis['prisma'] = client;

// test connection
async function connectDB() {
  try {
    await client.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectDB();

export default client;