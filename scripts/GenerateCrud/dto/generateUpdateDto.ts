import { isScalarType } from "../generate-crud.constants";
import { PrismaModel } from "../generate-crud.types";
import { prismaToZod } from "../helpers/prismaToZod";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateUpdateDto = (model: PrismaModel) => {
  const upperCaseModel = upperCaseFirst(model.name);

  const ignoredFields = ["id", "createdAt", "updatedAt"];

  const fields = model.fields
    .filter((field) => !ignoredFields.includes(field.name))
    .filter((field) => isScalarType(field.type))
    .map((field) => {
      let zodType = prismaToZod(field);

      if (!zodType.includes(".optional()")) {
        zodType += ".optional()";
      }

      return `    ${field.name}: ${zodType},`;
    })
    .join("\n");

  return `import { z } from 'zod'

export const update${upperCaseModel}Schema = z.object({
${fields}
})

export type Update${upperCaseModel}Dto = z.infer<typeof update${upperCaseModel}Schema>
`;
};
