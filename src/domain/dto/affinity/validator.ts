import { searchAffinityQueryParamsSchema } from "./searchAffinityQuery.dto";
import { updateAffinitySchema } from "./updateAffinity.dto";
import { createAffinitySchema } from "./createAffinity.dto";

export class affinityDtoValidator {

    static validateCreateDto(props: unknown) {
        return createAffinitySchema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return updateAffinitySchema.parse(props)
    }

    static validateSearchAffinityParamsQueryDto(props: unknown) {
        return searchAffinityQueryParamsSchema.parse(props)
    }
}
