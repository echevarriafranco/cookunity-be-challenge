import { PokemonType, Rarity, Expansion, Type } from '@prisma/client';


export class GetPokemonCardDto {
    id: string
    name: string;
    img: string;
    health: number;
    attack: number;
    type: Type;
    rarity: Rarity;
    expansion: Expansion;
    resistances?: PokemonType[];
    weaknesses?: PokemonType[];
}
