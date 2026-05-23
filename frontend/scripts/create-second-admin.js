import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin2@laarainnovations.com";
  const password = "adminpassword456";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Second Admin",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Second Admin created:", user.email);
}

main().
catch((e) => {
  console.error(e);
  process.exit(1);
}).
finally(async () => {
  await prisma.$disconnect();
});