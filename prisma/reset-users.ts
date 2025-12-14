
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🗑️  Cleaning up database...");

    // Delete all users except admin
    // Adjust the email check if you want to keep other specific users
    const deletedUsers = await prisma.user.deleteMany({
        where: {
            email: {
                not: "admin@example.com",
            },
        },
    });

    console.log(`✅ Deleted ${deletedUsers.count} test users.`);
    console.log("✨ Database ready for fresh testing.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
