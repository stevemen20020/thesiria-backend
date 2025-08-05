import { ArmorEntity } from "../armor/armor.entity";
import { AttacksEntity } from "../attacks/attacks.entity";
import { DevilFruitEntity } from "../devil_fruit/devilFruit.entity";
import { HakiTypesEntity } from "../haki_types/hakiTypes.entity";
import { ObjectsEntity } from "../objects/objects.entity";
import { SpellsEntity } from "../spells/spells.entity";
import { WeaponEntity } from "../weapon/weapon.entity";
export interface SkillUsageEntity {
  id: number;
  name: string;
  armor_armor_skill_usageToskill_usage?: ArmorEntity[];
  attacks_attacks_skill_usageToskill_usage?: AttacksEntity[];
  devil_fruit?: DevilFruitEntity[];
  haki_types?: HakiTypesEntity[];
  objects?: ObjectsEntity[];
  spells_spells_skill_usageToskill_usage?: SpellsEntity[];
  weapon_weapon_skill_usageToskill_usage?: WeaponEntity[];
}
