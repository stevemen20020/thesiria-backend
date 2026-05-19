import { isScalarType } from "../generate-crud.constants";
import { PrismaModel } from "../generate-crud.types";
import { prismaToZod } from "../helpers/prismaToZod";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateCreateDto = (model: PrismaModel) => {
  const upperCaseModel = upperCaseFirst(model.name);

  const ignoredFields = ["id", "createdAt", "updatedAt"];

  const fields = model.fields
    .filter((field) => !ignoredFields.includes(field.name))
    .filter((field) => isScalarType(field.type))
    .map((field) => {
      return `    ${field.name}: ${prismaToZod(field)},`;
    })
    .join("\n");

  return `import { z } from 'zod'

export const create${upperCaseModel}Schema = z.object({
${fields}
})

export type Create${upperCaseModel}Dto = z.infer<typeof create${upperCaseModel}Schema>
`;
};
