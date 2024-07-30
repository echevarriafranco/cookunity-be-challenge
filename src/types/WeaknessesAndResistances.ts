import { PokemonCard } from "@prisma/client";
import { GetPokemonCardDto } from "src/pokemon-card/dto/get-pokemon-card.dto";

export interface PokemonWeaknessesAndResistances {
    pokemon: GetPokemonCardDto
    weaknessTo: PokemonCard[]
    resistanceTo: PokemonCard[]
}