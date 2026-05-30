import { z } from 'zod'

export const searchStructuresQueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type SearchStructuresQueryParamsDto = z.infer<typeof searchStructuresQueryParamsSchema>
