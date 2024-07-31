import { ApiProperty } from '@nestjs/swagger';
import { PokemonType, Rarity, Expansion, Type } from '@prisma/client';
import { IsString, IsInt, Min, Max, IsEnum, IsUrl, Length } from 'class-validator';

export class GetPokemonCardDto {
    @ApiProperty({ description: 'The unique identifier of the Pokémon card' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'The name of the Pokémon card', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({ description: 'The image URL of the Pokémon card' })
    @IsUrl()
    img: string;

    @ApiProperty({ description: 'Health points of the Pokémon card', minimum: 1, maximum: 999 })
    @IsInt()
    @Min(1)
    @Max(999)
    health: number;

    @ApiProperty({ description: 'Attack points of the Pokémon card', minimum: 0, maximum: 999 })
    @IsInt()
    @Min(0)
    @Max(999)
    attack: number;

    @ApiProperty({ description: 'The type of Pokémon', enum: PokemonType })
    @IsEnum(PokemonType)
    type: Type;

    @ApiProperty({ description: 'The rarity of the Pokémon card', enum: Rarity })
    @IsEnum(Rarity)
    rarity: Rarity;

    @ApiProperty({ description: 'The expansion set of the Pokémon card', enum: Expansion })
    @IsEnum(Expansion)
    expansion: Expansion;

}
