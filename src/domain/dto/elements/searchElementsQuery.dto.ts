import { z } from 'zod'

export const searchElementsQueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type SearchElementsQueryParamsDto = z.infer<typeof searchElementsQueryParamsSchema>
