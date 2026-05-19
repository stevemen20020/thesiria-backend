#!/usr/bin/env node
/**
 * generate-mappers.ts
 *
 * Versión con límite de profundidad de includes.
 *
 * Uso:
 *   npx ts-node tools/generate-mappers.ts
 *
 * Ajusta rutas al inicio si es necesario.
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = process.cwd();
const PRISMA_SCHEMA = path.join(ROOT, "prisma", "schema.prisma");
const MAPPERS_BASE = path.join(ROOT, "src", "domain", "mappers");
const ENTITIES_BASE_RELATIVE = "../../entities"; // used to import entities relatively from mapper file

// === CONFIG ===
const MAX_INCLUDE_DEPTH = 3; // <- cambia esto si quieres otro límite
// ==============

if (!fs.existsSync(PRISMA_SCHEMA)) {
  console.error("No se encontró prisma/schema.prisma en la raíz del proyecto.");
  process.exit(1);
}

const schema = fs.readFileSync(PRISMA_SCHEMA, "utf8");

// --- Helpers de naming ---
const pascal = (s: string) =>
  s.replace(/(^\w|_\w)/g, (m) => m.replace(/_/, "").toUpperCase());
const camel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const lower = (s: string) => s.toLowerCase();
const modelToEntityName = (modelName: string) => `${pascal(modelName)}Entity`;

// --- Parseo simple de modelos Prisma ---
const modelRegex = /model\s+([A-Za-z0-9_]+)\s*{([^}]*)}/gs;
type FieldInfo = { name: string; typeRaw: string; isArray: boolean; isOptional: boolean; typeName: string };
type ModelInfo = { name: string; fields: FieldInfo[] };

const models: Record<string, ModelInfo> = {};

let m: RegExpExecArray | null;
while ((m = modelRegex.exec(schema)) !== null) {
  const name = m[1];
  const body = m[2];
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith("@@") && !l.startsWith("@"));

  const fields: FieldInfo[] = lines
    .map((line) => {
      // pattern: name type ...  (we only need first two tokens)
      const tokens = line.split(/\s+/);
      if (tokens.length < 2) return null;
      const fname = tokens[0];
      let ftype = tokens[1];
      const isArray = ftype.endsWith("[]");
      const cleanType = isArray ? ftype.replace(/\[\]$/, "") : ftype;
      const isOptional = cleanType.endsWith("?");
      const typeName = cleanType.replace(/\?$/, "");
      return {
        name: fname,
        typeRaw: ftype,
        isArray,
        isOptional,
        typeName,
      } as FieldInfo;
    })
    .filter(Boolean) as FieldInfo[];

  models[name] = { name, fields };
}

// Lista de nombres de modelos para detección de relaciones
const modelNames = Object.keys(models);

// Tipos escalares Prisma que mapeamos a Prisma scalar
const PRISMA_SCALARS = new Set([
  "Int",
  "String",
  "Boolean",
  "Float",
  "DateTime",
  "Decimal",
  "Json",
  "Bytes",
  "BigInt",
]);

/**
 * Construye el literal TS para include recursivo con:
 * - límite de profundidad MAX_INCLUDE_DEPTH
 * - protección contra ciclos (visited)
 *
 * Devuelve una string con la estructura del include (ej: "{ relA: { include: { relB: true }}}")
 * Si no hay relaciones devuelve "true"
 *
 * Importante: si inner === "true" se emite `relName?: true` (no `{ include: true }`)
 */
function buildIncludeLiteral(modelName: string, currentDepth = 0, visited = new Set<string>()): string {
  // Si ya llegamos al límite, devolvemos la hoja 'true'
  if (currentDepth >= MAX_INCLUDE_DEPTH) {
    return "true";
  }
  // Romper ciclos
  if (visited.has(modelName)) {
    return "true";
  }

  const model = models[modelName];
  if (!model) return "true";

  // copiamos visited para ramas independientes
  const nextVisited = new Set(visited);
  nextVisited.add(modelName);

  const relationFields = model.fields.filter((f) => modelNames.includes(f.typeName));
  if (relationFields.length === 0) return "true";

  const parts = relationFields.map((f) => {
    const inner = buildIncludeLiteral(f.typeName, currentDepth + 1, nextVisited);
    // Si inner es "true", debemos emitir `rel?: true` (Prisma acepta booleano)
    // Si inner es un objeto literal, emitimos `rel?: { include: <obj> }`
    if (inner.trim() === "true") {
      return `${f.name}?: true`;
    } else {
      return `${f.name}?: { include: ${inner} }`;
    }
  });

  return `{ ${parts.join(", ")} }`;
}

// --- Generación de archivos mappers por modelo ---
if (!fs.existsSync(MAPPERS_BASE)) {
  fs.mkdirSync(MAPPERS_BASE, { recursive: true });
}

const createdMappers: string[] = [];

for (const modelName of modelNames) {
  const model = models[modelName];
  const modelLower = lower(modelName);
  const folder = path.join(MAPPERS_BASE, modelLower);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  const entityTypeName = modelToEntityName(modelName);
  const mapperClassName = `${pascal(modelName)}Mapper`;
  const prismaIncludeLiteral = buildIncludeLiteral(modelName);

  // construir mapeo prismaToEntity: iterar campos escalares -> mapear nombres
  // heurística: convertimos snake_case a camelCase para entity fields; esto puede ajustarse.
  const scalarFields = model.fields.filter(
    (f) => PRISMA_SCALARS.has(f.typeName) || !modelNames.includes(f.typeName)
  );

  // Para entityToPrisma: sólo campos escalares (ignoramos relaciones)
  const entityToPrismaLines: string[] = [];
  scalarFields.forEach((f) => {
    const src = camel(f.name);
    // const src = f.name
    const dest = f.name;
    entityToPrismaLines.push(`      ${dest}: entity.${src} as any,`);
  });

  // prismaToEntity mapping: mapear campos a entity props (camelCase).
  const prismaToEntityLines: string[] = scalarFields.map((f) => {
    const dest = camel(f.name);
    const src = `model.${f.name}`;
    if (f.name.toLowerCase() === "id" && f.typeName === "Int") {
      return `      ${dest}: ${src} !== null && ${src} !== undefined ? ${src}.toString() : '',`;
    }
    if (f.typeName === "String" || f.typeName === "Float" || f.typeName === 'Int') {
      return `      ${dest}: ${src} !== null && ${src} !== undefined ? ${src}.toString() : '',`;
    }
    if (f.typeName === "DateTime") {
      return `      ${dest}: ${src} ? ${src} : '',`;
    }
    return `      ${dest}: ${src} !== undefined ? ${src} : undefined,`;
  });

  // Añadir relaciones en prismaToEntity: mapear a propiedades con mismo nombre camel
  const relationFields = model.fields.filter((f) => modelNames.includes(f.typeName));
  const relationLines = relationFields.map((f) => {
    const dest = camel(f.name);
    return `      ${dest}: model.${f.name} ? model.${f.name} : undefined,`;
  });

  const prismaImportModel = modelName;
  const fileContent = `// Auto-generated by tools/generate-mappers.ts
import { ${prismaImportModel}, Prisma } from "@prisma/client";
import { ${entityTypeName} } from "${path.posix.join(
    ENTITIES_BASE_RELATIVE,
    modelLower,
    `${modelLower}.entity`
  )}";

export class ${mapperClassName} {
  static prismaToEntity(model: Prisma.${prismaImportModel}GetPayload<{ include: ${prismaIncludeLiteral} }>): ${entityTypeName} {
    const mapped: ${entityTypeName} = {
${[...prismaToEntityLines, ...relationLines].join("\n")}
    };

    return mapped;
  }

  static entityToPrisma(entity: ${entityTypeName}): ${prismaImportModel} {
    // ⚠️ Ajusta manualmente si tu modelo tiene campos obligatorios/autogenerados.
    return {
${entityToPrismaLines.join("\n")}
    } as ${prismaImportModel};
  }
}

export default ${mapperClassName};
`;

  const filePath = path.join(folder, `${modelLower}.mapper.ts`);
  fs.writeFileSync(filePath, fileContent, "utf8");
  createdMappers.push(filePath);
  console.log(`Mapper generado: ${filePath}`);
}

// --- Generar index.ts que exporta todos los mappers ---
const indexLines = modelNames.map((name) => {
  const lowerName = lower(name);
  return `export * from "./${lowerName}/${lowerName}.mapper";`;
});

const indexPath = path.join(MAPPERS_BASE, "index.ts");
fs.writeFileSync(indexPath, indexLines.join("\n") + "\n", "utf8");
console.log(`Index de mappers generado: ${indexPath}`);

console.log("Generación completada. Revisa los mappers y ajusta manualmente los mapeos complejos si es necesario.");
