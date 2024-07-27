import { Injectable } from '@nestjs/common';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PokemonCardService {
  constructor(private prisma: PrismaService) { }

  create(createPokemonCardDto: CreatePokemonCardDto) {
    return 'This action adds a new pokemonCard';
  }

  async findAll() {
    return this.prisma.pokemonCard.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemonCard`;
  }

  update(id: number, updatePokemonCardDto: UpdatePokemonCardDto) {
    return `This action updates a #${id} pokemonCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemonCard`;
  }
}
