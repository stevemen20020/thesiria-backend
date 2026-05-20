import { z } from 'zod'

export const searchMissionsQueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type SearchMissionsQueryParamsDto = z.infer<typeof searchMissionsQueryParamsSchema>
