import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            id: 'a',
            username: 'testUser',
            password: '123',
            email: 'testUser@example.com',
        },
    });
    console.log(`Created new user: ${newUser.username} (ID: ${newUser.id})`);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });