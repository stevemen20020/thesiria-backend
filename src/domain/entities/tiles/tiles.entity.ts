import { ArmorEntity } from "../armor/armor.entity";
import { ObjectsEntity } from "../objects/objects.entity";
import { StructuresEntity } from "../structures/structures.entity";
import { StructuresEntity } from "../structures/structures.entity";
import { WeaponEntity } from "../weapon/weapon.entity";
export interface TilesEntity {
  id: number;
  name: string;
  image: string;
  structure_id: number;
  armor?: ArmorEntity[];
  objects?: ObjectsEntity[];
  structures_structures_location_idTotiles?: StructuresEntity[];
  structures_tiles_structure_idTostructures?: StructuresEntity;
  weapon?: WeaponEntity[];
}
