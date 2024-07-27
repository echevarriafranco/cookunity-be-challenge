import { Module } from '@nestjs/common';
import { PokemonCardService } from './pokemon-card.service';
import { PokemonCardController } from './pokemon-card.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PokemonCardController],
  providers: [PokemonCardService, PrismaService],
})
export class PokemonCardModule {}
