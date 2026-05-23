import { z } from 'zod'

export const createElementsSchema = z.object({
    name: z.string(),
})

export type CreateElementsDto = z.infer<typeof createElementsSchema>
