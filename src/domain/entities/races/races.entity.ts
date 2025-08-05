import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface RacesEntity {
  id: number;
  race: string;
  strength_bonus: number;
  dexterity_bonus: number;
  defense_bonus: number;
  aim_bonus: number;
  vision_bonus: number;
  speed_bonus: number;
  handcraft_bonus: number;
  agility_bonus: number;
  charisma_bonus: number;
  wisdom_bonus: number;
  npc?: NpcEntity[];
  playable_character?: PlayableCharacterEntity[];
}
