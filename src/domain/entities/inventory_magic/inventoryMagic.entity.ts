import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { SpellsEntity } from "../spells/spells.entity";
export interface InventoryMagicEntity {
  id: number;
  id_user: number;
  id_spell: number;
  uses: number;
  level?: number;
  playable_character?: PlayableCharacterEntity;
  spells?: SpellsEntity;
}
