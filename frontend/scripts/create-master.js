const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "master@laarainnovations.com";
  const password = "masterpassword123"; // In production, use an environment variable
  const hashedPassword = await bcrypt.hash(password, 10);

  const masterUser = await prisma.user.upsert({
    where: { email },
    update: {
      role: "MASTER"
    },
    create: {
      email,
      name: "Master Admin",
      password: hashedPassword,
      role: "MASTER"
    }
  });

  console.log(`Master Admin created: ${masterUser.email}`);
}

main().
catch((e) => {
  console.error(e);
  process.exit(1);
}).
finally(async () => {
  await prisma.$disconnect();
});

export {};