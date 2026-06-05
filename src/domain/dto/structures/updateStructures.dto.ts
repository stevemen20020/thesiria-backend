import { z } from 'zod'

export const updateStructuresSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    difficulty: z.string().optional(),
    locationId: z.string().optional(),
    horizontalTiles: z.number().optional(),
    verticalTiles: z.number().optional(),
})

export type UpdateStructuresDto = z.infer<typeof updateStructuresSchema>
