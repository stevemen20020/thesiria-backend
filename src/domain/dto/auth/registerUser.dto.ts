import { z } from 'zod'
import { createUserSchema } from './createUser.dto'
import { createPlayableCharacterSchema } from '../playableCharacter/createPlayableCharacter.dto'

export const registerUserSchema = z.object({
    user: createUserSchema,
    playableCharacter: createPlayableCharacterSchema
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>