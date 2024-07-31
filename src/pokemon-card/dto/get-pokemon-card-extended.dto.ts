import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { GetPokemonCardDto } from './get-pokemon-card.dto';

export class GetPokemonCardExtendedDto {

    @ApiProperty({ description: 'The Pokémon card', type: [GetPokemonCardDto] })
    pokemon: GetPokemonCardDto;

    @ApiProperty({ description: 'List of Pokémon this card is weak to', type: [GetPokemonCardDto] })
    @IsArray()
    weaknessTo: GetPokemonCardDto[];

    @ApiProperty({ description: 'List of Pokémon this card is resistant to', type: [GetPokemonCardDto] })
    @IsArray()
    resistanceTo: GetPokemonCardDto[];

}
