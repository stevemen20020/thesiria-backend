import { z } from 'zod'

export const updateTilesSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    image_public_id: z.string().optional(),
    structure_id: z.string().optional(),
})

export type UpdateTilesDto = z.infer<typeof updateTilesSchema>
