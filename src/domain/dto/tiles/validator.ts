import { searchTilesQueryParamsSchema } from "./searchTilesQuery.dto";
import { updateTilesSchema } from "./updateTiles.dto";
import { createTilesSchema } from "./createTiles.dto";

export class tilesDtoValidator {

    static validateCreateDto(props: unknown) {
        return createTilesSchema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return updateTilesSchema.parse(props)
    }

    static validateSearchTilesParamsQueryDto(props: unknown) {
        return searchTilesQueryParamsSchema.parse(props)
    }
}
