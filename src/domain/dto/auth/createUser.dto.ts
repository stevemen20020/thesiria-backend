import { z } from 'zod'

export const createUserSchema = z.object({
    username: z.string().min(3).optional(),
    name: z.string().min(3).optional(),
    last_name: z.string().min(3).optional(),
    password: z.string().min(3),
    email: z.string().email(),
})

export type CreateUserDto = z.infer<typeof createUserSchema>