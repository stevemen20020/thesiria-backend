import { MissionsEntity } from "../missions/missions.entity";
export interface MissionFasesEntity {
  id: string;
  idMission: string;
  description: string;
  fase: string;
  active: string;
  missions?: MissionsEntity;
}
