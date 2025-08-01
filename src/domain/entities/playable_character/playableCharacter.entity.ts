import { UserEntity } from "../user/user.entity";

export interface PlayableCharacter {
  id: number;
  user_id: number;
  name: string;
  biography?: string;
  id_race: number;
  positive_characteristic_1?: string;
  positive_characteristic_2?: string;
  positive_characteristic_3?: string;
  negative_characteristic_1?: string;
  negative_characteristic_2?: string;
  strength: number;
  dexterity: number;
  defense: number;
  aim: number;
  vision: number;
  speed: number;
  handcraft: number;
  agility: number;
  charisma: number;
  wisdom: number;
  affinity_id: number;
  chronicler_status: number; // 0 o 1, como booleano tinyint
  image_reference?: string;
  armor_id?: number;
  weapon_id?: number;
  haki_level?: number;
  haki_type_id?: number;
  devil_fruit_id?: number;
  devil_fruit_awakening?: number; // tinyint
  money?: number;
  health?: number;
  max_health?: number;
  active_max_health?: number;

  // Relaciones
//   attacks: Attack[];
//   inventory: Inventory[];
//   inventory_armor_inventory_armor_id_userToplayable_character: InventoryArmor[];
//   inventory_magic: InventoryMagic[];
//   inventory_weapon_inventory_weapon_id_userToplayable_character: InventoryWeapon[];
//   mission_journal: MissionJournal[];
  users: UserEntity;
//   races: Race;
//   affinity: Affinity;
//   inventory_armor_playable_character_armor_idToinventory_armor?: InventoryArmor;
//   inventory_weapon_playable_character_weapon_idToinventory_weapon?: InventoryWeapon;
//   haki_types?: HakiType;
//   devil_fruit?: DevilFruit;
//   playable_character_journal: PlayableCharacterJournal[];
}
