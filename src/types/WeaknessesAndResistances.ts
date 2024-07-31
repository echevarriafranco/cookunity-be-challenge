import { PokemonCard } from "@prisma/client";
import { PokemonCardExtended } from "./PokemonCardExtended";

export interface PokemonWeaknessesAndResistances {
    pokemon: PokemonCardExtended
    weaknessTo: PokemonCard[]
    resistanceTo: PokemonCard[]
}