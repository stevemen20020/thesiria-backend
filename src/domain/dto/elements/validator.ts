import { searchElementsQueryParamsSchema } from "./searchElementsQuery.dto";
import { updateElementsSchema } from "./updateElements.dto";
import { createElementsSchema } from "./createElements.dto";

export class elementsDtoValidator {

    static validateCreateDto(props: unknown) {
        return createElementsSchema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return updateElementsSchema.parse(props)
    }

    static validateSearchElementsParamsQueryDto(props: unknown) {
        return searchElementsQueryParamsSchema.parse(props)
    }
}
