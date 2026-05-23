import { z } from 'zod'

export const createMissionsSchema = z.object({
    giver_npc_id: z.string().optional(),
    name: z.string(),
    description: z.string(),
})

export type CreateMissionsDto = z.infer<typeof createMissionsSchema>
