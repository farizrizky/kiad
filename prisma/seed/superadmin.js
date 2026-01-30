const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "kiad@mail.com";
  const password = "kiad@2026";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Superadmin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name: "Super Admin",
      passwordHash,
      role: Role.SUPERADMIN,
      isActive: true,
    },
  });

  console.log("Superadmin created:");
  console.log(`   Email    : ${email}`);
  console.log(`   Password : ${password}`);
}

main()
  .catch((e) => {
    console.error("Seed error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
