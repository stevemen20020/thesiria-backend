import { affinityDatasource } from "../../../domain/datasources/affinity/affinity.datasource";
import { CreateAffinityDto } from "../../../domain/dto/affinity/createAffinity.dto";
import { SearchAffinityQueryParamsDto } from "../../../domain/dto/affinity/searchAffinityQuery.dto";
import { UpdateAffinityDto } from "../../../domain/dto/affinity/updateAffinity.dto";
import { AffinityEntity } from "../../../domain/entities";
import { affinityRepository } from "../../../domain/repositories/affinity/affinity.repository";

export class AffinityRepositoryImplementation implements affinityRepository {

    constructor(
        private readonly datasource: affinityDatasource
    ){}

    getAffinityById(
        id: string
    ): Promise<AffinityEntity> {

        return this.datasource.getAffinityById(id)
    }

    getAffinities(
        queryParams: SearchAffinityQueryParamsDto
    ): Promise<[AffinityEntity[], number]> {

        return this.datasource.getAffinities(queryParams)
    }

    updateAffinity(
        dto: UpdateAffinityDto,
        id: string
    ): Promise<AffinityEntity> {

        return this.datasource.updateAffinity(dto, id)
    }

    deleteAffinity(
        id: string
    ): Promise<string> {

        return this.datasource.deleteAffinity(id)
    }

    createAffinity(
        dto: CreateAffinityDto
    ): Promise<AffinityEntity> {
        return this.datasource.createAffinity(dto)
    }
}
