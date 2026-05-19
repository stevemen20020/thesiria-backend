import { z } from 'zod'

export const searchAffinityQueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type SearchAffinityQueryParamsDto = z.infer<typeof searchAffinityQueryParamsSchema>
