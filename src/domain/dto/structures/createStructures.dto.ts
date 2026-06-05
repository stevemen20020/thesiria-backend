import { z } from 'zod'

export const createStructuresSchema = z.object({
    name: z.string(),
    description: z.string(),
    difficulty: z.string(),
    locationId: z.string().optional(),
    horizontalTiles: z.number(),
    verticalTiles: z.number(),
})

export type CreateStructuresDto = z.infer<typeof createStructuresSchema>
