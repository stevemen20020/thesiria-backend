
import { CreateAffinityDto } from "../../dto/affinity/createAffinity.dto";
import { SearchAffinityQueryParamsDto } from "../../dto/affinity/searchAffinityQuery.dto";
import { UpdateAffinityDto } from "../../dto/affinity/updateAffinity.dto";
import { AffinityEntity } from "../../entities";


export interface affinityDatasource {
    getAffinityById(id: string) :Promise<AffinityEntity>;
    getAffinities(queryParams: SearchAffinityQueryParamsDto): Promise<[AffinityEntity[], number]>
    updateAffinity(dto: UpdateAffinityDto, id:string): Promise<AffinityEntity>
    deleteAffinity(id:string): Promise<string>
    createAffinity(dto: CreateAffinityDto): Promise<AffinityEntity>
}
