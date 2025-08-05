import { MissionsEntity } from "../missions/missions.entity";
export interface MissionFasesEntity {
  id: number;
  id_mission: number;
  description: string;
  fase: number;
  active: number;
  missions?: MissionsEntity;
}
