import { SearchRacesQueryParamsDto } from "../../dto/races/searchRacesQuery.dto";
import { UpdateRacesDto } from "../../dto/races/updateRaces.dto";
import { racesesEntity } from "../../entities/races/raceses.entity";

export interface racesRepository {
    getRacesById(id: string) :Promise<racesesEntity>;
    getRaceses(queryParams: SearchRacesQueryParamsDto): Promise<[racesesEntity[], number]>
    updateRaces(dto: UpdateRacesDto, id:string): Promise<racesesEntity>
    deleteRaces(id:string): Promise<string>
}
