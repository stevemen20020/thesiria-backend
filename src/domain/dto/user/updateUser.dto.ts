import { z } from 'zod'

export const updateUserSchema = z.object({
    userName: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
})

export type UpdateUserDto = z.infer<typeof updateUserSchema>