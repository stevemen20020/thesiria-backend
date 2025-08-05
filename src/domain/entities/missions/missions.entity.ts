import { MissionFasesEntity } from "../mission_fases/missionFases.entity";
import { MissionJournalEntity } from "../mission_journal/missionJournal.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface MissionsEntity {
  id: number;
  giver_npc_id?: number;
  name: string;
  description: string;
  mission_fases?: MissionFasesEntity[];
  mission_journal?: MissionJournalEntity[];
  npc?: NpcEntity;
}
