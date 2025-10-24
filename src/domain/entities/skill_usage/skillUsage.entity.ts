import { ArmorEntity } from "../armor/armor.entity";
import { AttacksEntity } from "../attacks/attacks.entity";
import { DevilFruitEntity } from "../devil_fruit/devilFruit.entity";
import { HakiTypesEntity } from "../haki_types/hakiTypes.entity";
import { ObjectsEntity } from "../objects/objects.entity";
import { SpellsEntity } from "../spells/spells.entity";
import { WeaponEntity } from "../weapon/weapon.entity";
export interface SkillUsageEntity {
  id: string;
  name: string;
  armorArmorSkillUsageToskillUsage?: ArmorEntity[];
  attacksAttacksSkillUsageToskillUsage?: AttacksEntity[];
  devilFruit?: DevilFruitEntity[];
  hakiTypes?: HakiTypesEntity[];
  objects?: ObjectsEntity[];
  spellsSpellsSkillUsageToskillUsage?: SpellsEntity[];
  weaponWeaponSkillUsageToskillUsage?: WeaponEntity[];
}
