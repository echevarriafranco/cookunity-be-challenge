import { PokemonType, Rarity, Expansion } from '@prisma/client';


export class CreatePokemonCardDto {
    name: string;
    health: number;
    attack: number;
    type: PokemonType;
    rarity: Rarity;
    expansion: Expansion;
    resistances?: string[];
    weaknesses?: string[];
}
