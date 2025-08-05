import { SkillUsageEntity } from "../skill_usage/skillUsage.entity";
import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface DevilFruitEntity {
  id: number;
  name: string;
  bonus: number;
  skill_bonused: number;
  description: string;
  awakening_description: string;
  skill_usage?: SkillUsageEntity;
  npc?: NpcEntity[];
  playable_character?: PlayableCharacterEntity[];
}
