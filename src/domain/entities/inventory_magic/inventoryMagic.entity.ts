import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { SpellsEntity } from "../spells/spells.entity";
export interface InventoryMagicEntity {
  id: string;
  idUser: string;
  idSpell: string;
  uses: string;
  level?: string;
  playableCharacter?: PlayableCharacterEntity;
  spells?: SpellsEntity;
}
