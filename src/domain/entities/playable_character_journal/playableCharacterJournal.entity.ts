import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface PlayableCharacterJournalEntity {
  id: string;
  playableCharacterId: string;
  npcId: string;
  relationship: string;
  playableCharacter?: PlayableCharacterEntity;
  npc?: NpcEntity;
}
