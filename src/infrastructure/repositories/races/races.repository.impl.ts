import { RacesRepository } from "../../../domain/repositories/races/races.repository";
import { RacesDatasource } from "../../../domain/datasources/races/races.datasource";
import { RacesesEntity } from "../../../domain/entities";
import { SearchRacesQueryParamsDto } from "../../../domain/dto/races/searchRacesQuery.dto";
import { UpdateRacesDto } from "../../../domain/dto/races/updateRaces.dto";

export class RacesRepositoryImplementation implements RacesRepository {

    constructor(
        private readonly datasource: RacesDatasource
    ){}

    getRacesById(
        id: string
    ): Promise<RacesesEntity> {

        return this.datasource.getRacesById(id)
    }

    getRaceses(
        queryParams: SearchRacesQueryParamsDto
    ): Promise<[RacesesEntity[], number]> {

        return this.datasource.getRaceses(queryParams)
    }

    updateRaces(
        dto: UpdateRacesDto,
        id: string
    ): Promise<RacesesEntity> {

        return this.datasource.updateRaces(dto, id)
    }

    deleteRaces(
        id: string
    ): Promise<string> {

        return this.datasource.deleteRaces(id)
    }
}
