import { z } from 'zod'

export const searchTilesQueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type SearchTilesQueryParamsDto = z.infer<typeof searchTilesQueryParamsSchema>
