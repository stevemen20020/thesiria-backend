import { searchStructuresQueryParamsSchema } from "./searchStructuresQuery.dto";
import { updateStructuresSchema } from "./updateStructures.dto";
import { createStructuresSchema } from "./createStructures.dto";

export class structuresDtoValidator {

    static validateCreateDto(props: unknown) {
        return createStructuresSchema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return updateStructuresSchema.parse(props)
    }

    static validateSearchStructuresParamsQueryDto(props: unknown) {
        return searchStructuresQueryParamsSchema.parse(props)
    }
}
