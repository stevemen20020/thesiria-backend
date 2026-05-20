import { searchMissionsQueryParamsSchema } from "./searchMissionsQuery.dto";
import { updateMissionsSchema } from "./updateMissions.dto";
import { createMissionsSchema } from "./createMissions.dto";

export class missionsDtoValidator {

    static validateCreateDto(props: unknown) {
        return createMissionsSchema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return updateMissionsSchema.parse(props)
    }

    static validateSearchMissionsParamsQueryDto(props: unknown) {
        return searchMissionsQueryParamsSchema.parse(props)
    }
}
