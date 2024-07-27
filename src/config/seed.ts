import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.pokemonCard.createMany({
        data: [
            {
                name: 'Pikachu',
                health: 100,
                originalAttack: 50,

            },
            {
                name: 'Charizard',
                health: 150,
                originalAttack: 80,

            },
            {
                name: 'Squirtle',
                health: 80,
                originalAttack: 40,

            }
        ]
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });