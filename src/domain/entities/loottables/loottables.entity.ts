import { NpcEntity } from "../npc/npc.entity";
import { ObjectsEntity } from "../objects/objects.entity";
export interface LoottablesEntity {
  id: number;
  id_npc?: number;
  id_monster?: number;
  id_object: number;
  amount: number;
  npc?: NpcEntity;
  objects?: ObjectsEntity;
}
