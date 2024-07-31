import { BattleResult } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class SimulateBattleDto {
    @ApiProperty({
        description: 'The ID of the Pokémon that is the attacker in the battle.',
        example: 'attacker-pokemon-id'
    })
    @IsString()
    attackerId: string;

    @ApiProperty({
        description: 'The ID of the Pokémon that is the defender in the battle.',
        example: 'defender-pokemon-id'
    })
    @IsString()
    defenderId: string;
}
