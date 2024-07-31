import { Controller, Get, Post, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatePokemonCardDto } from './dto/create-pokemon-card.dto';
import { UpdatePokemonCardDto } from './dto/update-pokemon-card.dto';
import { PokemonCardService } from './pokemon-card.service';
import { CardsSearchParams } from 'src/types/commons';
import { GetPokemonCardDto } from './dto/get-pokemon-card.dto';
import { Expansion, PokemonType } from '@prisma/client';
import { GetPokemonCardExtendedDto } from './dto/get-pokemon-card-extended.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('pokemon-card')
@Controller('pokemon-card')
@UseGuards(AuthGuard)
export class PokemonCardController {
  constructor(private readonly pokemonCardService: PokemonCardService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new Pokémon card',
    description: 'Creates a new Pokémon card and returns the created card.'
  })
  @ApiResponse({
    status: 201,
    description: 'The created Pokémon card',
    type: GetPokemonCardDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  create(@Body() createPokemonCardDto: CreatePokemonCardDto) {
    return this.pokemonCardService.create(createPokemonCardDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of Pokémon cards',
    description: 'Retrieves a list of Pokémon cards based on query parameters.'
  })
  @ApiQuery({
    name: 'queryByName',
    type: String,
    required: false,
    description: 'Search for Pokémon by name'
  })
  @ApiQuery({
    name: 'type',
    enum: PokemonType,
    required: false,
    description: 'Filter Pokémon by type'
  })
  @ApiQuery({
    name: 'queryByExpansion',
    enum: Expansion,
    required: false,
    description: 'Filter Pokémon by expansion'
  })
  @ApiResponse({
    status: 200,
    description: 'List of Pokémon cards',
    type: [GetPokemonCardDto]
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters'
  })
  findAll(@Query() query: CardsSearchParams) {
    return this.pokemonCardService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a Pokémon card by ID',
    description: 'Retrieves a Pokémon card by its ID.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the Pokémon card to retrieve'
  })
  @ApiResponse({
    status: 200,
    description: 'The requested Pokémon card',
    type: GetPokemonCardDto
  })
  @ApiResponse({
    status: 404,
    description: 'Pokemon not found'
  })
  findOne(@Param('id') id: string) {
    return this.pokemonCardService.findOne(id);
  }

  @Get(':id/include-details')
  @ApiOperation({
    summary: 'Get a Pokémon card by ID with extended information about resistances and weaknesses',
    description: 'Retrieves a Pokémon card by its ID along with detailed information about resistances and weaknesses.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the Pokémon card to retrieve'
  })
  @ApiResponse({
    status: 200,
    description: 'The requested Pokémon card with extended details',
    type: GetPokemonCardExtendedDto
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found'
  })
  findOneExtendedDetails(@Param('id') id: string) {
    return this.pokemonCardService.getPokemonCardDetailsAgainstAnotherCards(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a Pokémon card',
    description: 'Updates the Pokémon card with the given ID and returns the updated card.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the Pokémon card to update'
  })
  @ApiResponse({
    status: 200,
    description: 'The updated Pokémon card',
    type: GetPokemonCardDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found'
  })
  update(@Param('id') id: string, @Body() updatePokemonCardDto: UpdatePokemonCardDto) {
    return this.pokemonCardService.update(id, updatePokemonCardDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a Pokémon card',
    description: 'Deletes the Pokémon card with the given ID.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the Pokémon card to delete'
  })
  @ApiResponse({
    status: 200,
    description: 'Pokémon card successfully deleted',
    type: GetPokemonCardDto
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found'
  })

  remove(@Param('id') id: string) {
    return this.pokemonCardService.remove(id);
  }
}
