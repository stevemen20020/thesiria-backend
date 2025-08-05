import { ObjectsEntity } from "../objects/objects.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface NpcInventoryEntity {
  id: number;
  id_npc: number;
  id_object: number;
  quantity: number;
  objects?: ObjectsEntity;
  npc?: NpcEntity;
}
