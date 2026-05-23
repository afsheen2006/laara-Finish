const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const email = "admin@laara.com"
  const password = "Admin@2026"
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        role: "MASTER",
        password: hashedPassword,
      },
      create: {
        name: "Master Admin",
        email,
        password: hashedPassword,
        role: "MASTER",
      },
    })

    console.log("Master Admin created/updated successfully:")
    console.log("Email:", email)
    console.log("Password:", password)
    console.log("Role:", user.role)
  } catch (error) {
    console.error("Error creating admin:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
