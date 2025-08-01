import { z } from 'zod'

export const searchUserQueryParamsSchema = z.object({
    userName: z.string().min(1).optional(),
    page: z.string().min(1).optional().default('1'),
    limit: z.string().min(1).optional().default('10')
})

export type SearchUserQueryParamsDto = z.infer<typeof searchUserQueryParamsSchema>