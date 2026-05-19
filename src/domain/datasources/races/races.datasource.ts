import { CreateRacesDto } from "../../dto/races/createRaces.dto";
import { SearchRacesQueryParamsDto } from "../../dto/races/searchRacesQuery.dto";
import { UpdateRacesDto } from "../../dto/races/updateRaces.dto";
import { RacesEntity } from "../../entities";

export interface racesDatasource {
    getRacesById(id: string) :Promise<RacesEntity>;
    getRaces(queryParams: SearchRacesQueryParamsDto): Promise<[RacesEntity[], number]>
    updateRaces(dto: UpdateRacesDto, id:string): Promise<RacesEntity>
    deleteRaces(id:string): Promise<string>
    createRaces(dto: CreateRacesDto): Promise<RacesEntity>
}
