import { ElementsEntity } from "../elements/elements.entity";
import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface AffinityEntity {
  id: number;
  name: string;
  element_id: number;
  bonus: number;
  color: string;
  elements?: ElementsEntity;
  npc?: NpcEntity[];
  playable_character?: PlayableCharacterEntity[];
}
