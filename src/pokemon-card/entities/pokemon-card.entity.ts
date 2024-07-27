import { PokemonType, Rarity, Expansion } from '@prisma/client';

export class PokemonCard {
    id: string;
    name: string;
    createdAt: Date;
    health: number;
    attack: number;
    type: PokemonType;
    rarity: Rarity;
    expansion: Expansion;
    resistances: PokemonCard[];
    resistancesRelation: PokemonCard[];
    weaknesses: PokemonCard[];
    weaknessesRelation: PokemonCard[];
}