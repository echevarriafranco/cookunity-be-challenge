import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, IsInt, Min, Max, IsEnum, Length, IsOptional } from 'class-validator';
import { PokemonType, Rarity, Expansion } from '@prisma/client';

export class SearchPokemonsCardDto {
    @IsOptional()
    @IsString()
    queryByName?: string;

    @IsOptional()
    @IsEnum(PokemonType, {
        message: 'Invalid type. Allowed values are: ' + Object.values(PokemonType).join(', '),
    })
    type?: PokemonType;

    @IsOptional()
    queryByExpansion?: Expansion;
}
