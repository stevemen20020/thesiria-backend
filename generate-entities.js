const fs = require("fs");
const path = require("path");

const SCHEMA_PATH = path.join(__dirname, "prisma", "schema.prisma");
const ENTITY_BASE = path.join(__dirname, "src", "domain", "entities");
const DOMAIN_BASE = path.join(__dirname, "src", "domain");
const MAPPER_BASE = path.join(__dirname, "src", "domain", "mappers");

const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");

// Helpers
const toPascalCase = (str) =>
  str.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase());
const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
const isRelationLine = (line) => line.includes("@relation");

// === Extraer enums ===
const enumRegex = /enum (\w+) {\s*([^}]*)\s*}/g;
let enums = {};
let enumMatch;
const enumExports = [];

while ((enumMatch = enumRegex.exec(schema)) !== null) {
  const name = enumMatch[1];
  const values = enumMatch[2]
    .split("\n")
    .map((v) => v.trim())
    .filter((v) => v);
  enums[name] = values;

  const enumDir = path.join(DOMAIN_BASE, "enums");
  fs.mkdirSync(enumDir, { recursive: true });

  const enumPath = path.join(enumDir, `${name}.ts`);
  const enumContent = `export enum ${name} {
${values.map((v) => `  ${v} = "${v}",`).join("\n")}
}
`;
  fs.writeFileSync(enumPath, enumContent);
  enumExports.push(`export * from "./${name}";`);
  console.log(`✅ Enum generado: ${enumPath}`);
}

const enumIndexPath = path.join(DOMAIN_BASE, "enums", "index.ts");
fs.writeFileSync(enumIndexPath, enumExports.join("\n") + "\n");
console.log(`✅ index.ts generado en enums`);

// === Extraer modelos ===
const modelRegex = /model (\w+) {\s*([^}]*)\s*}/g;
let match;

const entityExports = [];

// Extraer todos los nombres de modelos
const modelNames = [];
let modelScan;
const modelScanRegex = /model (\w+) {/g;
while ((modelScan = modelScanRegex.exec(schema)) !== null) {
  modelNames.push(modelScan[1]);
}

while ((match = modelRegex.exec(schema)) !== null) {
  const modelName = match[1];
  const rawFields = match[2].trim();
  const entityName = toPascalCase(modelName) + "Entity";

  const entityFields = [];
  const usedEnums = new Set();
  const usedEntities = new Set();

  const fieldLines = rawFields
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of fieldLines) {
    if (line.startsWith("@@")) continue; // ⛔ Ignorar directivas Prisma como @@index

    const [rawName, rawType, ...rest] = line.split(/\s+/);
    const name = rawName;
    const type = rawType.replace("?", "").replace("[]", "");
    const isOptional = line.includes("?") || rest.includes("?");
    const isArray = line.includes("[]") || rawType.includes("[]");
    const isRelation = isRelationLine(line) || modelNames.includes(type);

    let tsType;

    if (enums[type]) {
      tsType = type;
      usedEnums.add(type);
    } else if (["Int", "Float", "Decimal"].includes(type)) {
      tsType = "number";
    } else if (type === "String") {
      tsType = "string";
    } else if (type === "Boolean") {
      tsType = "boolean";
    } else if (type === "DateTime") {
      tsType = "Date";
    } else {
      tsType = toPascalCase(type);
      if (isRelation) {
        usedEntities.add({
          name: tsType,
          importPath: `../${type}/${toCamelCase(type)}.entity`,
        });
      }
      tsType += "Entity";
    }

    const optionalMark = isOptional || isRelation ? "?" : "";
    const fieldType = isArray ? `${tsType}[]` : tsType;

    entityFields.push(`  ${name}${optionalMark}: ${fieldType};`);
  }

  const entityDir = path.join(ENTITY_BASE, modelName);
  fs.mkdirSync(entityDir, { recursive: true });

  const enumImports =
    usedEnums.size > 0
      ? `import { ${[...usedEnums].join(", ")} } from "../../enums";\n`
      : "";

  const entityImports = [...usedEntities]
    .map((e) => `import { ${e.name}Entity } from "${e.importPath}";`)
    .join("\n");

  const entityPath = path.join(
    entityDir,
    `${toCamelCase(modelName)}.entity.ts`
  );
  const entityContent = `${enumImports}${
    entityImports ? entityImports + "\n" : ""
  }\
export interface ${entityName} {
${entityFields.join("\n")}
}
`;

  fs.writeFileSync(entityPath, entityContent);
  console.log(`✅ Entity generada: ${entityPath}`);

  entityExports.push(
    `export * from "./${modelName}/${toCamelCase(modelName)}.entity";`
  );
}

// === Crear index.ts para Entities ===
fs.writeFileSync(
  path.join(ENTITY_BASE, "index.ts"),
  entityExports.join("\n") + "\n"
);
console.log(`✅ index.ts generado en entities`);
