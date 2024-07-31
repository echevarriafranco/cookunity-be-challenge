import { PokemonCard, Type } from "@prisma/client";

export interface PokemonCardExtended extends PokemonCard {
    type: Type
}