import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PrismaService } from 'src/prisma.service';
import { PokemonWeaknessesAndResistances } from 'src/types/WeaknessesAndResistances';
import { Expansion, PokemonCard } from '@prisma/client';
import { CardsSearchParams, ServiceResponse } from 'src/types/commons';
import { PokemonCardExtended } from 'src/types/PokemonCardExtended';

@Injectable()
export class PokemonCardService {
  constructor(private prisma: PrismaService) { }

  async create(createPokemonCardDto: CreatePokemonCardDto): Promise<ServiceResponse<PokemonCard>> {
    const { type, ...otherData } = createPokemonCardDto;

    const typeRecord = type ? await this.prisma.type.findFirst({
      where: { name: type },
    }) : null;
    if (!typeRecord) {
      return new NotFoundException('Type not found')
    }

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
        name: {
          equals: query.type,
        },
      }
    }

    if (query.queryByExpansion) {
      const upperCaseExpansion = query.queryByExpansion.toUpperCase();

      if (!Object.values(Expansion).includes(upperCaseExpansion as Expansion)) {
        return []
      }
      filters.expansion = {
        equals: upperCaseExpansion,
      };
    }
    const myObject = {
      where: filters,
      include: { type: true }
    };
    return this.prisma.pokemonCard.findMany(myObject);
  }

  async findOne(id: string): Promise<ServiceResponse<PokemonCard>> {
    const foundPokemon = await this.prisma.pokemonCard.findUnique({
      where: {
        id: id
      },
      include: { type: true }
    })
    if (!foundPokemon) {
      return new NotFoundException('Pokemon not found')
    }
    return foundPokemon
  }

  async getPokemonCardDetailsAgainstAnotherCards(id: string): Promise<ServiceResponse<PokemonWeaknessesAndResistances>> {
    const pokemonDetails: ServiceResponse<PokemonCardExtended> = await this.findOne(id) as PokemonCardExtended;
    if (!pokemonDetails) {
      return new NotFoundException('Pokemon not found')
    }
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

    const existingPokemon = await this.prisma.pokemonCard.findUnique({
      where: { id },
    });

    if (!existingPokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    let typeRecord = null;
    if (type) {
      typeRecord = await this.prisma.type.findFirst({
        where: { name: type },
      });

      if (!typeRecord) {
        throw new NotFoundException('Type not found');
      }
    }

    return this.prisma.pokemonCard.update({
      where: { id },
      data: {
        ...otherData,
        type: typeRecord ? {
          connect: { id: typeRecord.id },
        } : undefined,
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
