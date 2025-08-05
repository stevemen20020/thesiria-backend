import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { WeaponEntity } from "../weapon/weapon.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface InventoryWeaponEntity {
  id: number;
  id_user: number;
  id_weapon: number;
  level: number;
  playable_character_inventory_weapon_id_userToplayable_character?: PlayableCharacterEntity;
  weapon?: WeaponEntity;
  playable_character_playable_character_weapon_idToinventory_weapon?: PlayableCharacterEntity[];
}
