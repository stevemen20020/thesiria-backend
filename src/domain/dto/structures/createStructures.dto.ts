import { z } from 'zod'

export const createStructuresSchema = z.object({
    name: z.string(),
    description: z.string(),
    difficulty: z.string(),
    location_id: z.string().optional(),
})

export type CreateStructuresDto = z.infer<typeof createStructuresSchema>
