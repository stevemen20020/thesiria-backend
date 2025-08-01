import { searchUserQueryParamsSchema } from "./searchUserQuery.dto";
import { updateUserSchema } from "./updateUser.dto";

export class UserDtoValidator {
    static validateUpdateDto( props:unknown ) {
        return updateUserSchema.parse(props)
    }

    static validateSearchUserParamsQueryDto ( props:unknown ) {
        return searchUserQueryParamsSchema.parse(props)
    }
}