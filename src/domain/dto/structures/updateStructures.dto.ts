import { z } from 'zod'

export const updateStructuresSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    difficulty: z.string().optional(),
    location_id: z.string().optional(),
})

export type UpdateStructuresDto = z.infer<typeof updateStructuresSchema>
