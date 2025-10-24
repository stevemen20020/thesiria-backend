import { NpcEntity } from "../npc/npc.entity";
import { ObjectsEntity } from "../objects/objects.entity";
export interface LoottablesEntity {
  id: string;
  idNpc?: string;
  idMonster?: string;
  idObject: string;
  amount: string;
  npc?: NpcEntity;
  objects?: ObjectsEntity;
}
