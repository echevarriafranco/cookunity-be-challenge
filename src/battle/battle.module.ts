import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { PrismaService } from 'src/prisma.service';
import { PokemonCardService } from 'src/pokemon-card/pokemon-card.service';

@Module({
  imports: [],
  controllers: [BattleController],
  providers: [BattleService, PrismaService, PokemonCardService],
})
export class BattleModule { }
