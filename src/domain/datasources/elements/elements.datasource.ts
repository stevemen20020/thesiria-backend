import { SearchElementsQueryParamsDto } from "../../dto/elements/searchElementsQuery.dto";
import { UpdateElementsDto } from "../../dto/elements/updateElements.dto";
import { CreateElementsDto } from "../../dto/elements/createElements.dto";
import { ElementsEntity } from "../../entities";

export interface ElementsDatasource {
    getElementsById(id: string) :Promise<ElementsEntity>;
    getElements(queryParams: SearchElementsQueryParamsDto): Promise<[ElementsEntity[], number]>
    updateElements(dto: UpdateElementsDto, id:string): Promise<ElementsEntity>
    deleteElements(id:string): Promise<string>
    createElements(dto: CreateElementsDto): Promise<ElementsEntity>
}
