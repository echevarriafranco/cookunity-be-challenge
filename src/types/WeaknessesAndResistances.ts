import { PokemonCard } from "@prisma/client";

export interface PokemonWeaknessesAndResistances {
    pokemon: PokemonCard
    weaknesses: PokemonCard[]
    resistances: PokemonCard[]
}