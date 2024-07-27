import { Injectable } from '@nestjs/common';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PokemonCardService {
  constructor(private prisma: PrismaService) { }

  create(createPokemonCardDto: CreatePokemonCardDto) {
    const { resistances, weaknesses, ...pokemonCardData } = createPokemonCardDto;

    return this.prisma.pokemonCard.create({
      data: {
        ...pokemonCardData,
        resistances: {
          connect: resistances?.map((id) => ({ id: id })),
        },
        weaknesses: {
          connect: weaknesses?.map((id) => ({ id: id })),
        },
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
        }
      })
  }

  async getPokemonCardDetailsAgainstAnotherCards(id: string) {
    return this.prisma.pokemonCard.findUnique({
      where: {
        id,
      },
      include: {
        resistances: true,
        weaknesses: true,
      },
    });
  }

  async update(id: string, updatePokemonCardDto: UpdatePokemonCardDto) {
    const { resistances, weaknesses, ...pokemonCardData } = updatePokemonCardDto;

    return this.prisma.pokemonCard.update({
      where: { id },
      data: {
        ...pokemonCardData,
        resistances: {
          set: resistances?.map((id) => ({ id })),
        },
        weaknesses: {
          set: weaknesses?.map((id) => ({ id })),
        },
      },
      include: {
        resistances: true,
        weaknesses: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.pokemonCard.delete({
      where: {
        id: id
      }
    })
  }
}
