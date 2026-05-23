import { z } from 'zod'

export const updateMissionsSchema = z.object({
    giver_npc_id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
})

export type UpdateMissionsDto = z.infer<typeof updateMissionsSchema>
