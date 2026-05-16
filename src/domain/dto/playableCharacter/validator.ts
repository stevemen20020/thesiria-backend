import { createPlayableCharacterSchema } from "./createPlayableCharacter.dto";


export class PlayableCharacterDtoValidator {
    static validateCreateDto( props:unknown ) {
        return createPlayableCharacterSchema.parse(props)
    }
}