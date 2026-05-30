import { SearchStructuresQueryParamsDto } from "../../dto/structures/searchStructuresQuery.dto";
import { UpdateStructuresDto } from "../../dto/structures/updateStructures.dto";
import { CreateStructuresDto } from "../../dto/structures/createStructures.dto";
import { StructuresEntity } from "../../entities";

export interface StructuresRepository {
    getStructuresById(id: string) :Promise<StructuresEntity>;
    getStructures(queryParams: SearchStructuresQueryParamsDto): Promise<[StructuresEntity[], number]>
    updateStructures(dto: UpdateStructuresDto, id:string): Promise<StructuresEntity>
    deleteStructures(id:string): Promise<string>
    createStructures(dto: CreateStructuresDto): Promise<StructuresEntity>
}
