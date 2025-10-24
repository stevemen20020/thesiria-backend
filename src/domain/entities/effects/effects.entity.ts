import { SpellsEntity } from "../spells/spells.entity";
export interface EffectsEntity {
  id: string;
  name: string;
  description: string;
  durationInRounds: string;
  spells?: SpellsEntity[];
}
