import { SkillUsageEntity } from "../skill_usage/skillUsage.entity";
import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface DevilFruitEntity {
  id: string;
  name: string;
  bonus: string;
  skillBonused: string;
  description: string;
  awakeningDescription: string;
  skillUsage?: SkillUsageEntity;
  npc?: NpcEntity[];
  playableCharacter?: PlayableCharacterEntity[];
}
