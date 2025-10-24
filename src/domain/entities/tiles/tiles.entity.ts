import { ArmorEntity } from "../armor/armor.entity";
import { ObjectsEntity } from "../objects/objects.entity";
import { StructuresEntity } from "../structures/structures.entity";
import { WeaponEntity } from "../weapon/weapon.entity";
export interface TilesEntity {
  id: string;
  name: string;
  image: string;
  structureId: string;
  armor?: ArmorEntity[];
  objects?: ObjectsEntity[];
  structuresStructuresLocationIdTotiles?: StructuresEntity[];
  structuresTilesStructureIdTostructures?: StructuresEntity;
  weapon?: WeaponEntity[];
}
