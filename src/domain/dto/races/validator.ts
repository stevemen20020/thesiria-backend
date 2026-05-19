import { searchRacesQueryParamsSchema } from "./searchRacesQuery.dto";
import { updateRacesSchema } from "./updateRaces.dto";
import { createRacesSchema } from "./createRaces.dto";

export class racesDtoValidator {

    static validateCreateDto(props: unknown) {
        return createRacesSchema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return updateRacesSchema.parse(props)
    }

    static validateSearchRacesParamsQueryDto(props: unknown) {
        return searchRacesQueryParamsSchema.parse(props)
    }
}
