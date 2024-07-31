import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';


export class BattleResultDto {
    @ApiProperty({
        description: 'The unique identifier of the battle',
        example: '046c8158-38d5-4b0b-a27a-c95055714966'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The date and time when the battle was created',
        example: '2024-07-30T20:12:48.441Z'
    })
    @IsDateString()
    createdAt: string;

    @ApiProperty({
        description: 'The result of the battle',
        example: 'DEFENDER_VICTORY'
    })
    @IsString()
    result: string;

    @ApiProperty({
        description: 'The ID of the Pokémon that was the attacker',
        example: 'clz8s2amu0001thj5zo907qmh'
    })
    @IsString()
    attackerId: string;

    @ApiProperty({
        description: 'The ID of the Pokémon that was the defender',
        example: 'clz8s2ani0008thj57hi7vg1w'
    })
    @IsString()
    defenderId: string;
}