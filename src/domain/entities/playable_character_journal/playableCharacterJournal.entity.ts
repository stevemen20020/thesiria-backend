import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface PlayableCharacterJournalEntity {
  id: number;
  playable_character_id: number;
  npc_id: number;
  relationship: number;
  playable_character?: PlayableCharacterEntity;
  npc?: NpcEntity;
}
