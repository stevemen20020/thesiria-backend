import { SearchMissionsQueryParamsDto } from "../../dto/missions/searchMissionsQuery.dto";
import { UpdateMissionsDto } from "../../dto/missions/updateMissions.dto";
import { CreateMissionsDto } from "../../dto/missions/createMissions.dto";
import { MissionsEntity } from "../../entities";

export interface MissionsDatasource {
    getMissionsById(id: string) :Promise<MissionsEntity>;
    getMissions(queryParams: SearchMissionsQueryParamsDto): Promise<[MissionsEntity[], number]>
    updateMissions(dto: UpdateMissionsDto, id:string): Promise<MissionsEntity>
    deleteMissions(id:string): Promise<string>
    createMissions(dto: CreateMissionsDto): Promise<MissionsEntity>
}
