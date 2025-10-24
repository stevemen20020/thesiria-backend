import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface RacesEntity {
  id: string;
  race: string;
  strengthBonus: string;
  dexterityBonus: string;
  defenseBonus: string;
  aimBonus: string;
  visionBonus: string;
  speedBonus: string;
  handcraftBonus: string;
  agilityBonus: string;
  charismaBonus: string;
  wisdomBonus: string;
  npc?: NpcEntity[];
  playableCharacter?: PlayableCharacterEntity[];
}
