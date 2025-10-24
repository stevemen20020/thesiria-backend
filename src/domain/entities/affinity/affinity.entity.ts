import { ElementsEntity } from "../elements/elements.entity";
import { NpcEntity } from "../npc/npc.entity";
import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface AffinityEntity {
  id: string;
  name: string;
  elementId: string;
  bonus: string;
  color: string;
  elements?: ElementsEntity;
  npc?: NpcEntity[];
  playableCharacter?: PlayableCharacterEntity[];
}
