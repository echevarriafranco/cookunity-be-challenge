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
            resistances: [PokemonType.ELECTRIC],
            weaknesses: [PokemonType.GROUND],
            img: 'https://img.pokemondb.net/sprites/home/shiny/pikachu.png'
        },
    });

    const pokemon2 = await prisma.pokemonCard.create({
        data: {
            name: 'Charizard',
            health: 90,
            attack: 40,
            type: PokemonType.FIRE,
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.FIRE, PokemonType.GRASS, PokemonType.BUG],
            weaknesses: [PokemonType.WATER, PokemonType.ROCK, PokemonType.ELECTRIC],
            img: 'https://img.pokemondb.net/sprites/home/shiny/charizard.png'
        },
    });

    const pokemon3 = await prisma.pokemonCard.create({
        data: {
            name: 'Onix',
            img: 'https://img.pokemondb.net/sprites/home/shiny/onix.png',
            health: 160,
            attack: 30,
            type: PokemonType.ROCK,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.POISON, PokemonType.FLYING],
            weaknesses: [PokemonType.WATER, PokemonType.GRASS, PokemonType.FIGHTING, PokemonType.GROUND, PokemonType.STEEL]
        },
    });

    const pokemon4 = await prisma.pokemonCard.create({
        data: {
            name: 'Feraligatr',
            img: 'https://img.pokemondb.net/sprites/home/shiny/feraligatr.png',
            health: 120,
            attack: 70,
            type: PokemonType.WATER,
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.FIRE, PokemonType.WATER, PokemonType.ICE],
            weaknesses: [PokemonType.ELECTRIC, PokemonType.GRASS]
        },
    });

    const pokemon5 = await prisma.pokemonCard.create({
        data: {
            name: 'Sneasel',
            img: 'https://img.pokemondb.net/sprites/home/shiny/sneasel.png',
            health: 80,
            attack: 60,
            type: PokemonType.DARK,
            rarity: Rarity.UNCOMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.DARK],
            weaknesses: [PokemonType.FIGHTING, PokemonType.BUG, PokemonType.FAIRY]
        },
    });

    const pokemon6 = await prisma.pokemonCard.create({
        data: {
            name: 'Scizor',
            img: 'https://img.pokemondb.net/sprites/home/shiny/scizor.png',
            health: 100,
            attack: 80,
            type: PokemonType.BUG,
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.GRASS, PokemonType.FIGHTING, PokemonType.GROUND],
            weaknesses: [PokemonType.FIRE, PokemonType.FLYING, PokemonType.ROCK]
        },
    });

    const pokemon7 = await prisma.pokemonCard.create({
        data: {
            name: 'Treecko',
            img: 'https://img.pokemondb.net/sprites/home/shiny/treecko.png',
            health: 50,
            attack: 40,
            type: PokemonType.GRASS,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.WATER, PokemonType.ELECTRIC, PokemonType.GRASS],
            weaknesses: [PokemonType.FIRE, PokemonType.ICE, PokemonType.POISON, PokemonType.FLYING, PokemonType.BUG]
        },
    });

    const pokemon8 = await prisma.pokemonCard.create({
        data: {
            name: 'Charmander',
            img: 'https://img.pokemondb.net/sprites/home/shiny/charmander.png',
            health: 60,
            attack: 50,
            type: PokemonType.FIRE,
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.FIRE, PokemonType.GRASS, PokemonType.BUG],
            weaknesses: [PokemonType.WATER, PokemonType.GROUND, PokemonType.ROCK]
        },
    });

    const pokemon9 = await prisma.pokemonCard.create({
        data: {
            name: 'Charmeleon',
            img: 'https://img.pokemondb.net/sprites/home/shiny/charmeleon.png',
            health: 80,
            attack: 70,
            type: PokemonType.FIRE,
            rarity: Rarity.UNCOMMON,
            expansion: Expansion.POKEMON_GO,
            resistances: [PokemonType.FIRE, PokemonType.GRASS, PokemonType.BUG],
            weaknesses: [PokemonType.WATER, PokemonType.GROUND, PokemonType.ROCK]
        },
    });

}

main()
    .catch((e) => {
        console.error('error seeding:...', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });