import { SpellsEntity } from "../spells/spells.entity";
export interface EffectsEntity {
  id: number;
  name: string;
  description: string;
  duration_in_rounds: number;
  spells?: SpellsEntity[];
}
