import { racesDatasource } from "../../../domain/datasources/races/races.datasource";
import { CreateRacesDto } from "../../../domain/dto/races/createRaces.dto";
import { SearchRacesQueryParamsDto } from "../../../domain/dto/races/searchRacesQuery.dto";
import { UpdateRacesDto } from "../../../domain/dto/races/updateRaces.dto";
import { RacesEntity } from "../../../domain/entities";
import { racesRepository } from "../../../domain/repositories/races/races.repository";

export class RacesRepositoryImplementation implements racesRepository {

    constructor(
        private readonly datasource: racesDatasource
    ){}

    getRacesById(
        id: string
    ): Promise<RacesEntity> {

        return this.datasource.getRacesById(id)
    }

    getRaceses(
        queryParams: SearchRacesQueryParamsDto
    ): Promise<[RacesEntity[], number]> {

        return this.datasource.getRaces(queryParams)
    }

    updateRaces(
        dto: UpdateRacesDto,
        id: string
    ): Promise<RacesEntity> {

        return this.datasource.updateRaces(dto, id)
    }

    deleteRaces(
        id: string
    ): Promise<string> {

        return this.datasource.deleteRaces(id)
    }

    createRaces(
        dto: CreateRacesDto
    ): Promise<RacesEntity> {
        return this.datasource.createRaces(dto)
    }
}
