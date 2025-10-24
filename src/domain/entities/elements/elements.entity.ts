import { AffinityEntity } from "../affinity/affinity.entity";
import { ArmorEntity } from "../armor/armor.entity";
import { ObjectsEntity } from "../objects/objects.entity";
import { WeaponEntity } from "../weapon/weapon.entity";
export interface ElementsEntity {
  id: string;
  name: string;
  affinity?: AffinityEntity[];
  armor?: ArmorEntity[];
  objects?: ObjectsEntity[];
  weapon?: WeaponEntity[];
}
