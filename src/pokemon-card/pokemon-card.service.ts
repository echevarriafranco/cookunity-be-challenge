import { Injectable } from '@nestjs/common';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PrismaService } from 'src/prisma.service';
import { PokemonWeaknessesAndResistances } from 'src/types/WeaknessesAndResistances';
import { PokemonCard } from '@prisma/client';

@Injectable()
export class PokemonCardService {
  constructor(private prisma: PrismaService) { }

  create(createPokemonCardDto: CreatePokemonCardDto): Promise<PokemonCard> {
    return this.prisma.pokemonCard.create({
      data: {
        ...createPokemonCardDto
      }
    });
  }

  async findAll(): Promise<PokemonCard[]> {
    return this.prisma.pokemonCard.findMany();
  }

  findOne(id: string): Promise<PokemonCard> {
    return this.prisma.pokemonCard.findUnique(
      {
        where: {
          id: id
        }
      })
  }

  async getPokemonCardDetailsAgainstAnotherCards(id: string): Promise<PokemonWeaknessesAndResistances> {
    const pokemonDetails = await this.findOne(id);

    const resistancesList = await this.prisma.pokemonCard.findMany({
      where: {
        type: { in: (await pokemonDetails).resistances },
      }
    })

    const weaknessesList = await this.prisma.pokemonCard.findMany({
      where: {
        type: { in: (await pokemonDetails).weaknesses },
      }
    })
    return {
      pokemon: pokemonDetails,
      weaknesses: weaknessesList,
      resistances: resistancesList
    }
  }

  async update(id: string, updatePokemonCardDto: UpdatePokemonCardDto): Promise<PokemonCard> {
    return this.prisma.pokemonCard.update({
      where: { id },
      data: {
        ...updatePokemonCardDto,
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
