import { PokemonType, Rarity, Expansion } from '@prisma/client';


export class CreatePokemonCardDto {
    name: string;
    img: string;
    health: number;
    attack: number;
    type: PokemonType;
    rarity: Rarity;
    expansion: Expansion;
    resistances?: PokemonType[];
    weaknesses?: PokemonType[];
}
