import { Module } from '@nestjs/common';
import { PokemonCardModule } from './pokemon-card/pokemon-card.module';
import { PrismaService } from './prisma.service';
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [PokemonCardModule, BattleModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
