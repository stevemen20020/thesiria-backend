import { PrismaField } from "../generate-crud.types";


export const prismaToZod = (
  field: PrismaField
) => {

  const map: Record<string, string> = {
    String: "z.string()",
    Int: "z.string()",
    Float: "z.number()",
    Boolean: "z.string()",
    DateTime: "z.string()",
    Json: "z.string()",
  };

  let zodType =
    map[field.type] ||
    "z.any()";

  if (field.isArray) {
    zodType = `z.array(${zodType})`;
  }

  if (field.isOptional) {
    zodType += ".optional()";
  }

  return zodType;
};