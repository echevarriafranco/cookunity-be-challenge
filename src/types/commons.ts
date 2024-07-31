import { NotFoundException, ValidationError } from "@nestjs/common";
import { PokemonType, Expansion } from "@prisma/client";

export class CardsSearchParams {
    queryByName?: string;
    type?: PokemonType;
    queryByExpansion?: Expansion;
}

export type ServiceResponse<T> = T | NotFoundException | ValidationError;
