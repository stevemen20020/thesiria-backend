import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { ArmorEntity } from "../armor/armor.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface InventoryArmorEntity {
  id: number;
  id_user: number;
  id_armor: number;
  level: number;
  playable_character_inventory_armor_id_userToplayable_character?: PlayableCharacterEntity;
  armor?: ArmorEntity;
  playable_character_playable_character_armor_idToinventory_armor?: PlayableCharacterEntity[];
}
