import { MissionsRepository } from "../../../domain/repositories/missions/missions.repository";
import { MissionsDatasource } from "../../../domain/datasources/missions/missions.datasource";
import { MissionsEntity } from "../../../domain/entities";
import { SearchMissionsQueryParamsDto } from "../../../domain/dto/missions/searchMissionsQuery.dto";
import { UpdateMissionsDto } from "../../../domain/dto/missions/updateMissions.dto";
import { CreateMissionsDto } from "../../../domain/dto/missions/createMissions.dto";

export class MissionsRepositoryImplementation implements MissionsRepository {

    constructor(
        private readonly datasource: MissionsDatasource
    ){}

    getMissionsById(
        id: string
    ): Promise<MissionsEntity> {

        return this.datasource.getMissionsById(id)
    }

    getMissions(
        queryParams: SearchMissionsQueryParamsDto
    ): Promise<[MissionsEntity[], number]> {

        return this.datasource.getMissions(queryParams)
    }

    updateMissions(
        dto: UpdateMissionsDto,
        id: string
    ): Promise<MissionsEntity> {

        return this.datasource.updateMissions(dto, id)
    }

    createMissions(
        dto: CreateMissionsDto
    ): Promise<MissionsEntity> {

        return this.datasource.createMissions(dto)
    }

    deleteMissions(
        id: string
    ): Promise<string> {

        return this.datasource.deleteMissions(id)
    }
}
