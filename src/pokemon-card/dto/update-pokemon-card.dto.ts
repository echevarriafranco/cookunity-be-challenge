import { PartialType } from "@nestjs/mapped-types";
import { PokemonType, Rarity, Expansion } from '@prisma/client';
import { CreatePokemonCardDto } from "./create-pokemon-card.dto";
export class UpdatePokemonCardDto extends PartialType(CreatePokemonCardDto) {
    name?: string;
    health?: number;
    attack?: number;
    type?: PokemonType;
    rarity?: Rarity;
    expansion?: Expansion;
    resistances?: string[];
    weaknesses?: string[];
}
