import { z } from 'zod'

export const createAffinitySchema = z.object({
    name: z.string(),
    elementId: z.string(),
    bonus: z.string(),
    color: z.string(),
})

export type CreateAffinityDto = z.infer<typeof createAffinitySchema>
