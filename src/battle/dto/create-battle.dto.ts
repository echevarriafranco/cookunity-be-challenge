import { BattleResult } from "@prisma/client";

export class CreateBattleDto {
    attackerId: string;
    defenderId: string;
    result: BattleResult;
}
