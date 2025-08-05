import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { MissionsEntity } from "../missions/missions.entity";
export interface MissionJournalEntity {
  id: number;
  playable_character_id: number;
  mission_id: number;
  completed: number;
  playable_character?: PlayableCharacterEntity;
  missions?: MissionsEntity;
}
