import { Module } from '@nestjs/common';
import { PokemonCardModule } from './pokemon-card/pokemon-card.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PokemonCardModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
