import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonCardModule } from './pokemon-card/pokemon-card.module';

@Module({
  imports: [PokemonCardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
