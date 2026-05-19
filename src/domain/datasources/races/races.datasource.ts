import { SearchracesQueryParamsDto } from "../../dto/races/searchRacesQuery.dto";
import { UpdateracesDto } from "../../dto/races/updateRaces.dto";
import { racesesEntity } from "../../entities/races/raceses.entity";

export interface racesDatasource {
    getracesById(id: string) :Promise<racesesEntity>;
    getraceses(queryParams: SearchracesQueryParamsDto): Promise<[racesesEntity[], number]>
    updateraces(dto: UpdateracesDto, id:string): Promise<racesesEntity>
    deleteraces(id:string): Promise<string>
}
