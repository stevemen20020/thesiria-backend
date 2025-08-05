import { attacks_weapon_type, attacks_attack_type } from "../../enums";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { SkillUsageEntity } from "../skill_usage/skillUsage.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface AttacksEntity {
  id: number;
  id_playable_character?: number;
  id_npc?: number;
  skill_usage: number;
  name: string;
  weapon_type: attacks_weapon_type;
  attack_type: attacks_attack_type;
  attack_points: number;
  favorite: number;
  uses: number;
  max_uses: number;
  playable_character?: PlayableCharacterEntity;
  skill_usage_attacks_skill_usageToskill_usage?: SkillUsageEntity;
  npc?: NpcEntity;
}
