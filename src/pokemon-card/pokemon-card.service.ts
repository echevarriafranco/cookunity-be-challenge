import { Injectable } from '@nestjs/common';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PokemonCardService {
  constructor(private prisma: PrismaService) { }

  create(createPokemonCardDto: CreatePokemonCardDto) {
    return this.prisma.pokemonCard.create({
      data: {
        name: createPokemonCardDto.name,
        health: createPokemonCardDto.health,
        attack: createPokemonCardDto.attack,
        type: createPokemonCardDto.type,
        rarity: createPokemonCardDto.rarity,
        expansion: createPokemonCardDto.expansion
      },
      include: {
        resistances: true,
        weaknesses: true,
      }
    });
  }

  async findAll() {
    return this.prisma.pokemonCard.findMany();
  }

  findOne(id: string) {
    return this.prisma.pokemonCard.findUnique(
      {
        where: {
          id: id
        },
        include: {
          resistances: true,
          weaknesses: true,
        }
      })
  }

  update(id: string, updatePokemonCardDto: UpdatePokemonCardDto) {
    return `This action updates a #${id} pokemonCard`;
  }

  remove(id: string) {
    return this.prisma.pokemonCard.delete({
      where: {
        id: id
      }
    })
  }
}
