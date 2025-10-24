import { MissionFasesEntity } from "../mission_fases/missionFases.entity";
import { MissionJournalEntity } from "../mission_journal/missionJournal.entity";
import { NpcEntity } from "../npc/npc.entity";
export interface MissionsEntity {
  id: string;
  giverNpcId?: string;
  name: string;
  description: string;
  missionFases?: MissionFasesEntity[];
  missionJournal?: MissionJournalEntity[];
  npc?: NpcEntity;
}
