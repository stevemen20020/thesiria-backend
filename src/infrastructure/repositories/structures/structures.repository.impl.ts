import { StructuresRepository } from "../../../domain/repositories/structures/structures.repository";
import { StructuresDatasource } from "../../../domain/datasources/structures/structures.datasource";
import { StructuresEntity } from "../../../domain/entities";
import { SearchStructuresQueryParamsDto } from "../../../domain/dto/structures/searchStructuresQuery.dto";
import { UpdateStructuresDto } from "../../../domain/dto/structures/updateStructures.dto";
import { CreateStructuresDto } from "../../../domain/dto/structures/createStructures.dto";

export class StructuresRepositoryImplementation implements StructuresRepository {

    constructor(
        private readonly datasource: StructuresDatasource
    ){}

    getStructuresById(
        id: string
    ): Promise<StructuresEntity> {

        return this.datasource.getStructuresById(id)
    }

    getStructures(
        queryParams: SearchStructuresQueryParamsDto
    ): Promise<[StructuresEntity[], number]> {

        return this.datasource.getStructures(queryParams)
    }

    updateStructures(
        dto: UpdateStructuresDto,
        id: string
    ): Promise<StructuresEntity> {

        return this.datasource.updateStructures(dto, id)
    }

    createStructures(
        dto: CreateStructuresDto
    ): Promise<StructuresEntity> {

        return this.datasource.createStructures(dto)
    }

    deleteStructures(
        id: string
    ): Promise<string> {

        return this.datasource.deleteStructures(id)
    }
}
