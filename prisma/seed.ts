import { PrismaClient, PokemonType, Rarity, Expansion } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    const TypeRelations = {
        FIRE: {
            resistances: [PokemonType.FIRE, PokemonType.GRASS, PokemonType.ICE, PokemonType.BUG, PokemonType.STEEL, PokemonType.FAIRY],
            weaknesses: [PokemonType.WATER, PokemonType.ROCK, PokemonType.GROUND]
        },
        WATER: {
            resistances: [PokemonType.WATER, PokemonType.FIRE, PokemonType.ICE, PokemonType.STEEL],
            weaknesses: [PokemonType.ELECTRIC, PokemonType.GRASS]
        },
        ELECTRIC: {
            resistances: [PokemonType.ELECTRIC, PokemonType.FLYING, PokemonType.STEEL],
            weaknesses: [PokemonType.GROUND]
        },
        GRASS: {
            resistances: [PokemonType.WATER, PokemonType.ELECTRIC, PokemonType.GRASS, PokemonType.GROUND],
            weaknesses: [PokemonType.FIRE, PokemonType.ICE, PokemonType.POISON, PokemonType.FLYING, PokemonType.BUG]
        },
        ICE: {
            resistances: [PokemonType.ICE],
            weaknesses: [PokemonType.FIRE, PokemonType.FIGHTING, PokemonType.ROCK, PokemonType.STEEL]
        },
        FIGHTING: {
            resistances: [PokemonType.BUG, PokemonType.ROCK, PokemonType.DARK],
            weaknesses: [PokemonType.FLYING, PokemonType.PSYCHIC, PokemonType.FAIRY]
        },
        POISON: {
            resistances: [PokemonType.GRASS, PokemonType.FIGHTING, PokemonType.POISON, PokemonType.BUG, PokemonType.FAIRY],
            weaknesses: [PokemonType.GROUND, PokemonType.PSYCHIC]
        },
        GROUND: {
            resistances: [PokemonType.POISON, PokemonType.ROCK],
            weaknesses: [PokemonType.WATER, PokemonType.GRASS, PokemonType.ICE]
        },
        FLYING: {
            resistances: [PokemonType.GRASS, PokemonType.FIGHTING, PokemonType.BUG],
            weaknesses: [PokemonType.ELECTRIC, PokemonType.ICE, PokemonType.ROCK]
        },
        PSYCHIC: {
            resistances: [PokemonType.FIGHTING, PokemonType.PSYCHIC],
            weaknesses: [PokemonType.BUG, PokemonType.GHOST, PokemonType.DARK]
        },
        BUG: {
            resistances: [PokemonType.GRASS, PokemonType.FIGHTING, PokemonType.GROUND],
            weaknesses: [PokemonType.FIRE, PokemonType.FLYING, PokemonType.ROCK]
        },
        ROCK: {
            resistances: [PokemonType.FIRE, PokemonType.POISON, PokemonType.FLYING],
            weaknesses: [PokemonType.WATER, PokemonType.GRASS, PokemonType.FIGHTING, PokemonType.GROUND, PokemonType.STEEL]
        },
        GHOST: {
            resistances: [PokemonType.POISON, PokemonType.BUG],
            weaknesses: [PokemonType.GHOST, PokemonType.DARK]
        },
        DRAGON: {
            resistances: [PokemonType.FIRE, PokemonType.WATER, PokemonType.ELECTRIC, PokemonType.GRASS],
            weaknesses: [PokemonType.ICE, PokemonType.DRAGON, PokemonType.FAIRY]
        },
        DARK: {
            resistances: [PokemonType.GHOST, PokemonType.DARK],
            weaknesses: [PokemonType.FIGHTING, PokemonType.BUG, PokemonType.FAIRY]
        },
        STEEL: {
            resistances: [PokemonType.GRASS, PokemonType.ICE, PokemonType.FLYING, PokemonType.PSYCHIC, PokemonType.BUG, PokemonType.ROCK, PokemonType.DRAGON, PokemonType.STEEL, PokemonType.FAIRY],
            weaknesses: [PokemonType.FIRE, PokemonType.FIGHTING, PokemonType.GROUND]
        },
        FAIRY: {
            resistances: [PokemonType.FIGHTING, PokemonType.BUG, PokemonType.DARK],
            weaknesses: [PokemonType.POISON, PokemonType.STEEL]
        }
    };
    const typeEntries = Object.values(PokemonType);

    for (const typeName of typeEntries) {
        await prisma.type.create({
            data: {
                name: typeName,
                resistances: TypeRelations[typeName].resistances,
                weaknesses: TypeRelations[typeName].weaknesses
            },
        });
    }


    const pokemon1 = await prisma.pokemonCard.create({
        data: {
            name: 'Pikachu',
            health: 60,
            attack: 50,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.ELECTRIC
                        }
                    })).id
                }
            },
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO,
            img: 'https://img.pokemondb.net/sprites/home/shiny/pikachu.png'
        },
    });

    const pokemon2 = await prisma.pokemonCard.create({
        data: {
            name: 'Charizard',
            health: 90,
            attack: 40,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.FIRE
                        }
                    })).id
                }
            },
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO,
            img: 'https://img.pokemondb.net/sprites/home/shiny/charizard.png'
        },
    });

    const pokemon3 = await prisma.pokemonCard.create({
        data: {
            name: 'Onix',
            img: 'https://img.pokemondb.net/sprites/home/shiny/onix.png',
            health: 160,
            attack: 30,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.ROCK
                        }
                    })).id
                }
            },
            rarity: Rarity.COMMON,
            expansion: Expansion.POKEMON_GO
        },
    });

    const pokemon4 = await prisma.pokemonCard.create({
        data: {
            name: 'Feraligatr',
            img: 'https://img.pokemondb.net/sprites/home/shiny/feraligatr.png',
            health: 120,
            attack: 70,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.WATER
                        }
                    })).id
                }
            },
            rarity: Rarity.RARE,
            expansion: Expansion.POKEMON_GO
        },
    });

    const pokemon5 = await prisma.pokemonCard.create({
        data: {
            name: 'Sneasel',
            img: 'https://img.pokemondb.net/sprites/home/shiny/sneasel.png',
            health: 80,
            attack: 60,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.DARK
                        }
                    })).id
                }
            },
            rarity: Rarity.UNCOMMON,
            expansion: Expansion.POKEMON_GO
        },
    });

    const pokemon6 = await prisma.pokemonCard.create({
        data: {
            name: 'Scizor',
            img: 'https://img.pokemondb.net/sprites/home/shiny/scizor.png',
            health: 100,
            attack: 80,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.BUG
                        }
                    })).id
                }
            },
            rarity: Rarity.RARE,
            expansion: Expansion.SWORD_AND_SHIELD
        },
    });

    const pokemon7 = await prisma.pokemonCard.create({
        data: {
            name: 'Treecko',
            img: 'https://img.pokemondb.net/sprites/home/shiny/treecko.png',
            health: 50,
            attack: 40,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.GRASS
                        }
                    })).id
                }
            },
            rarity: Rarity.COMMON,
            expansion: Expansion.LOST_ORIGIN
        },
    });

    const pokemon8 = await prisma.pokemonCard.create({
        data: {
            name: 'Charmander',
            img: 'https://img.pokemondb.net/sprites/home/shiny/charmander.png',
            health: 60,
            attack: 50,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.FIRE
                        }
                    })).id
                }
            },
            rarity: Rarity.COMMON,
            expansion: Expansion.SILVER_TEMPEST
        },
    });

    const pokemon9 = await prisma.pokemonCard.create({
        data: {
            name: 'Charmeleon',
            img: 'https://img.pokemondb.net/sprites/home/shiny/charmeleon.png',
            health: 80,
            attack: 70,
            type: {
                connect: {
                    id: (await prisma.type.findFirst({
                        where: {
                            name: PokemonType.FIRE
                        }
                    })).id
                }
            },
            rarity: Rarity.UNCOMMON,
            expansion: Expansion.BRILLIANT_STARS
        },
    });

    const hashedPassword = await bcrypt.hash('adminPassword', 10);

    await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: hashedPassword,
        },
    });

    console.log('Admin user created');
}

main()
    .catch((e) => {
        console.error('error seeding:...', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });




