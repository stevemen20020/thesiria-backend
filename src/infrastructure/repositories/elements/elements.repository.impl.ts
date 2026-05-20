import { ElementsRepository } from "../../../domain/repositories/elements/elements.repository";
import { ElementsDatasource } from "../../../domain/datasources/elements/elements.datasource";
import { ElementsEntity } from "../../../domain/entities";
import { SearchElementsQueryParamsDto } from "../../../domain/dto/elements/searchElementsQuery.dto";
import { UpdateElementsDto } from "../../../domain/dto/elements/updateElements.dto";
import { CreateElementsDto } from "../../../domain/dto/elements/createElements.dto";

export class ElementsRepositoryImplementation implements ElementsRepository {

    constructor(
        private readonly datasource: ElementsDatasource
    ){}

    getElementsById(
        id: string
    ): Promise<ElementsEntity> {

        return this.datasource.getElementsById(id)
    }

    getElements(
        queryParams: SearchElementsQueryParamsDto
    ): Promise<[ElementsEntity[], number]> {

        return this.datasource.getElements(queryParams)
    }

    updateElements(
        dto: UpdateElementsDto,
        id: string
    ): Promise<ElementsEntity> {

        return this.datasource.updateElements(dto, id)
    }

    createElements(
        dto: CreateElementsDto
    ): Promise<ElementsEntity> {

        return this.datasource.createElements(dto)
    }

    deleteElements(
        id: string
    ): Promise<string> {

        return this.datasource.deleteElements(id)
    }
}
