import { ObjectsEntity } from "../objects/objects.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface InventoryEntity {
  id: number;
  id_playable_character?: number;
  id_object?: number;
  quantity?: number;
  objects?: ObjectsEntity;
  playable_character?: PlayableCharacterEntity;
}
