import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};





const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (import.meta.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;