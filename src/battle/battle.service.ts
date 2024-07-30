import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BattleResult, PokemonCard } from '@prisma/client';
import { PokemonCardService } from 'src/pokemon-card/pokemon-card.service';
import { PokemonWeaknessesAndResistances } from 'src/types/WeaknessesAndResistances';
import { GetPokemonCardDto } from 'src/pokemon-card/dto/get-pokemon-card.dto';

@Injectable()
export class BattleService {
  @Inject(PokemonCardService)
  private readonly pokemonCardService: PokemonCardService;

  constructor(private prisma: PrismaService) { }

  async simulateBattle(attackerId: string, defenderId: string) {
    // get defender and attacker details
    const attacker: GetPokemonCardDto = await this.pokemonCardService.findOne(attackerId)
    const defender: PokemonWeaknessesAndResistances = await this.pokemonCardService.getPokemonCardDetailsAgainstAnotherCards(defenderId)

    const damageToDefender = this.calculateDamage(
      attacker,
      defender.resistanceTo,
      defender.weaknessTo,
    );

    const isAttackerVictorious = damageToDefender >= defender.pokemon.health;
    const result = isAttackerVictorious ? BattleResult.ATTACKER_VICTORY : BattleResult.DEFENDER_VICTORY

    const battle = await this.prisma.battle.create({
      data: {
        attacker: {
          connect: { id: attacker.id }
        },
        defender: {
          connect: { id: defender.pokemon.id }
        },
        result,
      },
    });
    return { isAttackerVictorious, damageToDefender, battle };
  }


  findAll() {
    return this.prisma.battle.findMany()
  }

  /**
   * Calculate the damage checking in defender weaknesses and resistances
   * @param attacker 
   * @param defenderResistances 
   * @param defenderWeaknesses 
   * @returns 
   */
  private calculateDamage(
    attacker: GetPokemonCardDto,
    defenderResistances: PokemonCard[],
    defenderWeaknesses: PokemonCard[]
  ): number {
    let damageMultiplier = 1;

    if (defenderResistances.some(resistance => resistance.id === attacker.id)) {
      damageMultiplier = 0.5;
    } else if (defenderWeaknesses.some(weakness => weakness.id === attacker.id)) {
      damageMultiplier = 1.5;
    }
    return Math.floor(attacker.attack * damageMultiplier);
  }

}
