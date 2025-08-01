const fs = require("fs");
const path = require("path");

const SCHEMA_PATH = path.join(__dirname, "prisma", "schema.prisma");
const ENTITY_BASE = path.join(__dirname, "src", "domain", "entities");
const MAPPER_BASE = path.join(__dirname, "src", "domain", "mappers");

const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");

// Helpers
const toPascalCase = str => str.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase());
const toCamelCase = str => str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
const isRelationLine = line => line.includes("@relation");

// === Extraer enums ===
const enumRegex = /enum (\w+) {\s*([^}]*)\s*}/g;
let enums = {};
let enumMatch;
while ((enumMatch = enumRegex.exec(schema)) !== null) {
  const name = enumMatch[1];
  const values = enumMatch[2]
    .split("\n")
    .map(v => v.trim())
    .filter(v => v);
  enums[name] = values;

  const enumDir = path.join(ENTITY_BASE, "enums");
  fs.mkdirSync(enumDir, { recursive: true });
  const enumPath = path.join(enumDir, `${name}.ts`);
  const enumContent = `export enum ${name} {
${values.map(v => `  ${v} = "${v}",`).join("\n")}
}
`;
  fs.writeFileSync(enumPath, enumContent);
  console.log(`✅ Enum generado: ${enumPath}`);
}

// === Extraer modelos ===
const modelRegex = /model (\w+) {\s*([^}]*)\s*}/g;
let match;

while ((match = modelRegex.exec(schema)) !== null) {
  const modelName = match[1]; // e.g. playable_character
  const rawFields = match[2].trim();
  const entityName = toPascalCase(modelName) + "Entity";
  const mapperName = toPascalCase(modelName) + "Mapper";

  const entityFields = [];
  const mapperFields = [];

  const fieldLines = rawFields.split("\n").map(line => line.trim()).filter(Boolean);

  for (const line of fieldLines) {
    const [rawName, rawType, ...rest] = line.split(/\s+/);
    const name = rawName;
    const type = rawType.replace("?", "").replace("[]", "");
    const isOptional = line.includes("?") || rest.includes("?");
    const isArray = line.includes("[]") || rawType.includes("[]");
    const isRelation = isRelationLine(line);

    let tsType;

    if (enums[type]) {
      tsType = type;
    } else if (["Int", "Float", "Decimal"].includes(type)) {
      tsType = "number";
    } else if (type === "String") {
      tsType = "string";
    } else if (type === "Boolean") {
      tsType = "boolean";
    } else if (type === "DateTime") {
      tsType = "Date";
    } else {
      tsType = toPascalCase(type); // relaciones
    }

    const fullType = `${tsType}${isArray ? "[]" : ""}${isOptional ? " | undefined" : ""}`;

    entityFields.push(`  ${name}${isOptional ? "?" : ""}: ${isArray ? `${tsType}[]` : tsType};`);

    if (!isRelation) {
      mapperFields.push(`      ${name}: prisma.${name}${isOptional ? " ?? undefined" : ""},`);
    }
  }

  const entityDir = path.join(ENTITY_BASE, modelName);
  const mapperDir = path.join(MAPPER_BASE, modelName);
  fs.mkdirSync(entityDir, { recursive: true });
  fs.mkdirSync(mapperDir, { recursive: true });

  // === Entity ===
  const entityPath = path.join(entityDir, `${toCamelCase(modelName)}.entity.ts`);
  const entityContent = `import { ${Object.keys(enums).join(", ")} } from "../../enums";

export interface ${entityName} {
${entityFields.join("\n")}
}
`;
  fs.writeFileSync(entityPath, entityContent);
  console.log(`✅ Entity generada: ${entityPath}`);

  // === Mapper ===
  const mapperPath = path.join(mapperDir, `${toCamelCase(modelName)}.mapper.ts`);
  const mapperContent = `import { ${modelName} as PrismaModel } from "@prisma/client";
import { ${entityName} } from "../../entities/${modelName}/${toCamelCase(modelName)}.entity";

export class ${mapperName} {
  static prismaToEntity(prisma: PrismaModel): ${entityName} {
    return {
${mapperFields.join("\n")}
    };
  }

  static entityToPrisma(entity: ${entityName}): PrismaModel {
    return {
${mapperFields
  .map(f =>
    f
      .replace("prisma.", "entity.")
      .replace(" ?? undefined", " ?? null")
      .replace(/,$/, "")
  )
  .join(",\n")}
    } as PrismaModel;
  }
}
`;
  fs.writeFileSync(mapperPath, mapperContent);
  console.log(`✅ Mapper generado: ${mapperPath}`);
}
