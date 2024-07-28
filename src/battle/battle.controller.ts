import { Controller, Get, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('battle')
@ApiTags('Battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) { }

  @Post('simulate')
  async simulateBattle(@Body() body: { attackerId: string; defenderId: string }) {
    const { attackerId, defenderId } = body;


    const { isAttackerVictorious, damageToDefender, battle } =
      await this.battleService.simulateBattle(attackerId, defenderId);

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
  findAll() {
    return this.battleService.findAll();
  }

}
