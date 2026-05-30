import { z } from 'zod'

export const createTilesSchema = z.object({
    name: z.string(),
    image: z.string().optional(),
    image_public_id: z.string().optional(),
    structure_id: z.string(),
})

export type CreateTilesDto = z.infer<typeof createTilesSchema>
