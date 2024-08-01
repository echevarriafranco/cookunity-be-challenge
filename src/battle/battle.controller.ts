import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BattleService } from './battle.service';
import { SimulateBattleDto } from './dto/create-battle.dto';
import { BattleResultDto } from './dto/get-battle.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('battle')
@ApiTags('Battle')
@UseGuards(AuthGuard)
@ApiBearerAuth('token')
export class BattleController {
  constructor(private readonly battleService: BattleService) { }

  @Post('simulate')
  @ApiOperation({
    summary: 'Simulate a Pokémon battle',
    description: 'Simulates a Pokémon battle between the attacker and defender provided in the request body, and returns the result of the battle.'
  })
  @ApiResponse({
    status: 201,
    description: 'The result of the simulated Pokémon battle',
    type: BattleResultDto
  })
  async simulateBattle(@Body() createBattleDto: SimulateBattleDto) {
    const { isAttackerVictorious, damageToDefender, battle } =
      await this.battleService.simulateBattle(createBattleDto.attackerId, createBattleDto.defenderId);

    return {
      isAttackerVictorious,
      damageToDefender,
      battle: {
        id: battle.id,
        attackerId: battle.attackerId,
        defenderId: battle.defenderId,
        result: battle.result,
        createdAt: battle.createdAt,
      },
    };
  }


  @Get()
  @ApiOperation({
    summary: 'Get all battles',
    description: 'Retrieves a list of all battles.'
  })
  @ApiResponse({
    status: 200,
    description: 'List of all battles',
    type: [BattleResultDto]
  })
  @ApiResponse({
    status: 404,
    description: 'No battles found'
  })
  findAll() {
    return this.battleService.findAll();
  }

}
