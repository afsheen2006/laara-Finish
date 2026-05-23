const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function initCMS() {
  console.log("Initializing Core CMS Blocks...")

  // System Config
  const existingConfig = await prisma.pageBlock.findFirst({
    where: { type: "SYSTEM_CONFIG" }
  })

  if (!existingConfig) {
    await prisma.pageBlock.create({
      data: {
        type: "SYSTEM_CONFIG",
        title: "Global Site Settings",
        content: JSON.stringify({
          siteName: "Laara Innovations",
          siteLogo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg",
          contactEmail: "info@laara.com",
          primaryColor: "#15E5C4",
        }),
        order: 0,
      }
    })
    console.log("Created SYSTEM_CONFIG")
  }

  // Nav Links
  const existingNav = await prisma.pageBlock.findFirst({
    where: { type: "NAV_LINKS" }
  })

  if (!existingNav) {
    await prisma.pageBlock.create({
      data: {
        type: "NAV_LINKS",
        title: "Primary Navigation",
        content: JSON.stringify([
          { href: "/#home", label: "Home" },
          { href: "/#about", label: "About" },
          { href: "/software", label: "Products" },
          { href: "/drone-rd", label: "Research" },
          { href: "/#contact", label: "Contact Us" },
        ]),
        order: 1,
      }
    })
    console.log("Created NAV_LINKS")
  }

  console.log("Initialization complete.")
}

initCMS()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
