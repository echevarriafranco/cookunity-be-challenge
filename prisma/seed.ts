import { PrismaClient, PokemonType, Rarity, Expansion } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const pokemon1 = await prisma.pokemonCard.create({
        data: {
            name: 'Pikachu',
            health: 60,
            attack: 50,
            type: PokemonType.ELECTRIC,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,

        },
    })

    const pokemon2 = await prisma.pokemonCard.create({
        data: {
            name: 'Charizard',
            health: 90,
            attack: 40,
            type: PokemonType.FIRE,
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO,
            resistances: {
                connect: [pokemon1],
            },
        },
    })

    const pokemon3 = await prisma.pokemonCard.create({
        data: {
            name: 'Onix',
            health: 160,
            attack: 30,
            type: PokemonType.ROCK,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: {
                connect: [pokemon1],
            },
            weaknesses: {
                connect: [pokemon2],
            },
        },
    })

    const pokemon4 = await prisma.pokemonCard.create({
        data: {
            name: 'Feraligatr',
            health: 120,
            attack: 70,
            type: PokemonType.WATER,
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO
        },
    })

    const pokemon5 = await prisma.pokemonCard.create({
        data: {
            name: 'Sneasel',
            health: 80,
            attack: 60,
            type: PokemonType.DARK,
            rarity: Rarity.UNCOMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: {
                connect: [pokemon2, pokemon1],
            },
            weaknesses: {
                connect: [pokemon4],
            },
        },
    })

    const pokemon6 = await prisma.pokemonCard.create({
        data: {
            name: 'Scizor',
            health: 100,
            attack: 80,
            type: PokemonType.BUG,
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO,
            weaknesses: {
                connect: [pokemon1, pokemon3],
            },
        },
    })

    const pokemon7 = await prisma.pokemonCard.create({
        data: {
            name: 'Treecko',
            health: 50,
            attack: 40,
            type: PokemonType.GRASS,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO
        },
    })

    const pokemon8 = await prisma.pokemonCard.create({
        data: {
            name: 'Charmander',
            health: 60,
            attack: 50,
            type: PokemonType.FIRE,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: {
                connect: [pokemon2, pokemon1],
            },
            weaknesses: {
                connect: [pokemon5, pokemon6],
            }
        },
    })

    const pokemon9 = await prisma.pokemonCard.create({
        data: {
            name: 'Charmeleon',
            health: 80,
            attack: 70,
            type: PokemonType.FIRE,
            rarity: Rarity.UNCOMMON,
            expansion: Expansion.POKEMON_GO
        },
    })

}

main()
    .catch((e) => {
        console.error('error seeding:...', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });