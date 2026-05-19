import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateSearchDto = (model: string) => {
  const upperCaseModel = upperCaseFirst(model)

  return `import { z } from 'zod'

export const search${upperCaseModel}QueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type Search${upperCaseModel}QueryParamsDto = z.infer<typeof search${upperCaseModel}QueryParamsSchema>
`;
}