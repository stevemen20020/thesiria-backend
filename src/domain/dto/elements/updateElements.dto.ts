import { z } from 'zod'

export const updateElementsSchema = z.object({
    name: z.string().optional(),
})

export type UpdateElementsDto = z.infer<typeof updateElementsSchema>
