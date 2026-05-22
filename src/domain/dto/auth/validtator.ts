import { createUserSchema } from "./createUser.dto";
import { loginUserSchema } from "./loginUser.dto";
import { registerUserSchema } from "./registerUser.dto";


export class AuthDtoValidator {
    static validateLoginDto( props:unknown ) {
        return loginUserSchema.parse(props)
    }

    static validateRegisterUserDto ( props:unknown ) {
        return createUserSchema.parse(props)
    }

    static validateRegisterDto ( props:unknown ) {
        return registerUserSchema.parse(props)
    }
}