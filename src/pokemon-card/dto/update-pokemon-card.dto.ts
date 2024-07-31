import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, IsInt, Min, Max, IsEnum, Length, IsOptional } from 'class-validator';
import { PokemonType, Rarity, Expansion } from '@prisma/client';

export class UpdatePokemonCardDto {
    @ApiPropertyOptional({ description: 'The name of the Pokémon card', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ description: 'The image URL of the Pokémon card' })
    @IsUrl()
    @IsOptional()
    img?: string;

    @ApiPropertyOptional({ description: 'Health points of the Pokémon card', minimum: 1, maximum: 999 })
    @IsInt()
    @Min(1)
    @Max(999)
    @IsOptional()
    health?: number;

    @ApiPropertyOptional({ description: 'Attack points of the Pokémon card', minimum: 0, maximum: 999 })
    @IsInt()
    @Min(0)
    @Max(999)
    @IsOptional()
    attack?: number;

    @ApiPropertyOptional({ description: 'The type of Pokémon', enum: PokemonType })
    @IsEnum(PokemonType)
    @IsOptional()
    type?: PokemonType;

    @ApiPropertyOptional({ description: 'The rarity of the Pokémon card', enum: Rarity })
    @IsEnum(Rarity)
    @IsOptional()
    rarity?: Rarity;

    @ApiPropertyOptional({ description: 'The expansion set of the Pokémon card', enum: Expansion })
    @IsEnum(Expansion)
    @IsOptional()
    expansion?: Expansion;
}
