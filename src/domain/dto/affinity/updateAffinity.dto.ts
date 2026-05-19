import { z } from 'zod'

export const updateAffinitySchema = z.object({
    name: z.string().optional(),
    elementId: z.string().optional(),
    bonus: z.string().optional(),
    color: z.string().optional(),
})

export type UpdateAffinityDto = z.infer<typeof updateAffinitySchema>
