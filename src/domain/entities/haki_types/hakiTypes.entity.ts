import { SkillUsageEntity } from "../skill_usage/skillUsage.entity";
import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface HakiTypesEntity {
  id: number;
  name: string;
  description: string;
  skill_bonused: number;
  skill_usage?: SkillUsageEntity;
  npc?: NpcEntity[];
  playable_character?: PlayableCharacterEntity[];
}
