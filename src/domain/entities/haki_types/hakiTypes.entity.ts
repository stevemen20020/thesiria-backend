import { SkillUsageEntity } from "../skill_usage/skillUsage.entity";
import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface HakiTypesEntity {
  id: string;
  name: string;
  description: string;
  skillBonused: string;
  skillUsage?: SkillUsageEntity;
  npc?: NpcEntity[];
  playableCharacter?: PlayableCharacterEntity[];
}
