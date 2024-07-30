import { Injectable } from '@nestjs/common';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PrismaService } from 'src/prisma.service';
import { PokemonWeaknessesAndResistances } from 'src/types/WeaknessesAndResistances';
import { PokemonCard } from '@prisma/client';
import { CardsSearchParams } from 'src/types/commons';
import { GetPokemonCardDto } from './dto/get-pokemon-card.dto';

@Injectable()
export class PokemonCardService {
  constructor(private prisma: PrismaService) { }

  async create(createPokemonCardDto: CreatePokemonCardDto): Promise<PokemonCard> {
    const { type, ...otherData } = createPokemonCardDto;

    const typeRecord = await this.prisma.type.findFirst({
      where: {
        name: type
      },
    });
    return this.prisma.pokemonCard.create({
      data: {
        ...otherData,
        type: {
          connect: { id: typeRecord.id },
        },
      }
    });
  }

  async findAll(query: CardsSearchParams): Promise<PokemonCard[]> {
    const filters: {
      name?: any
      expansion?: any
      type?: any
    } = {};

    if (query.queryByName) {
      filters.name = {
        contains: query.queryByName,
        mode: 'insensitive',
      };
    }
    if (query.type) {
      filters.type = {
        equals: query.type,
      }
    }
    if (query.queryByExpansion) {
      filters.expansion = {
        equals: query.queryByExpansion,
      };
    }
    const myObject = {
      where: filters,
      include: { type: true }
    };
    return this.prisma.pokemonCard.findMany(myObject);
  }

  findOne(id: string): Promise<GetPokemonCardDto> {
    return this.prisma.pokemonCard.findUnique(
      {
        where: {
          id: id
        },
        include: { type: true }
      })
  }

  async getPokemonCardDetailsAgainstAnotherCards(id: string): Promise<PokemonWeaknessesAndResistances> {
    const pokemonDetails: GetPokemonCardDto = await this.findOne(id);

    const resistancesPokemons = await this.prisma.pokemonCard.findMany({
      where: {
        type: {
          name: {
            in: pokemonDetails.type.resistances,
          },
        },
      }
    });

    const weaknessesPokemons = await this.prisma.pokemonCard.findMany({
      where: {
        type: {
          name: {
            in: pokemonDetails.type.weaknesses,
          },
        },
      },
    });

    return {
      pokemon: pokemonDetails,
      resistanceTo: resistancesPokemons,
      weaknessTo: weaknessesPokemons,
    }
  }


  async update(id: string, updatePokemonCardDto: UpdatePokemonCardDto): Promise<PokemonCard> {
    const { type, ...otherData } = updatePokemonCardDto;

    const typeRecord = type ? await this.prisma.type.findFirst({
      where: { name: type },
    }) : null;

    return this.prisma.pokemonCard.update({
      where: { id },
      data: {
        ...otherData,
        type: typeRecord ? {
          connect: { id: typeRecord.id },
        } : undefined,
      }
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
