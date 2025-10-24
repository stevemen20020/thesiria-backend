import { attacks_weapon_type, attacks_attack_type } from "../../enums";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { SkillUsageEntity } from "../skill_usage/skillUsage.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface AttacksEntity {
  id: string;
  idPlayableCharacter?: string;
  idNpc?: string;
  skillUsage: string;
  name: string;
  weaponType: attacks_weapon_type;
  attackType: attacks_attack_type;
  attackPoints: string;
  favorite: string;
  uses: string;
  maxUses: string;
  playableCharacter?: PlayableCharacterEntity;
  skillUsageAttacksSkillUsageToskillUsage?: SkillUsageEntity;
  npc?: NpcEntity;
}
