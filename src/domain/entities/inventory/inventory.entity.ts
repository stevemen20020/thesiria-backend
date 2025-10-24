import { ObjectsEntity } from "../objects/objects.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface InventoryEntity {
  id: string;
  idPlayableCharacter?: string;
  idObject?: string;
  quantity?: string;
  objects?: ObjectsEntity;
  playableCharacter?: PlayableCharacterEntity;
}
