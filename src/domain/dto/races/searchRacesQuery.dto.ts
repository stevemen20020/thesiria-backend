import { z } from 'zod'

export const searchRacesQueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type SearchRacesQueryParamsDto = z.infer<typeof searchRacesQueryParamsSchema>
