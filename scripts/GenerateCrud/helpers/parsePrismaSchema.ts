import { PrismaField, PrismaModel } from "../generate-crud.types";


export const parsePrismaSchema = (
  schema: string
): PrismaModel[] => {

  const models: PrismaModel[] = [];

  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;

  let modelMatch;

  while ((modelMatch = modelRegex.exec(schema)) !== null) {

    const [, modelName, body] = modelMatch;

    const fields: PrismaField[] = [];

    const lines = body
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !line.startsWith("//"))
      .filter((line) => !line.startsWith("@@"));

    for (const line of lines) {

      const parts = line.split(/\s+/);

      const fieldName = parts[0];

      let rawType = parts[1];

      const attributes = parts.slice(2);

      const isOptional = rawType.endsWith("?");

      const isArray = rawType.endsWith("[]");

      rawType = rawType
        .replace("?", "")
        .replace("[]", "");

      fields.push({
        name: fieldName,
        type: rawType,
        isOptional,
        isArray,
        attributes,
      });
    }

    models.push({
      name: modelName,
      fields,
    });
  }

  return models;
};