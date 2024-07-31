import { Module } from '@nestjs/common';
import { PokemonCardModule } from './pokemon-card/pokemon-card.module';
import { PrismaService } from './prisma.service';
import { BattleModule } from './battle/battle.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './ErrorInterceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PokemonCardModule, BattleModule, AuthModule],
  controllers: [],
  providers: [PrismaService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }],
})
export class AppModule {}
