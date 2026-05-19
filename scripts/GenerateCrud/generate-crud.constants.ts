import path from "path";

const ROOT = process.cwd();

const PRISMA_SCHEMA_PATH = path.join(ROOT, "prisma/schema.prisma");
const PRESENTATION_PATH = path.join(ROOT, "src/presentation");
const GLOBAL_ROUTES_PATH = path.join(PRESENTATION_PATH, "routes.ts");
const DOMAIN_PATH = path.join(ROOT, "src/domain");
const DOMAIN_DATASOURCES_PATH = path.join(DOMAIN_PATH, "datasources");
const DOMAIN_REPOSITORIES_PATH = path.join(DOMAIN_PATH, "repositories");
const DOMAIN_DTO_PATH = path.join(DOMAIN_PATH, "dto");
const DOMAIN_ENTITIES_PATH = path.join(DOMAIN_PATH, "entities");
const INFRASTRUCTURE_PATH = path.join(ROOT, "src/infrastructure");

const INFRASTRUCTURE_DATASOURCES_PATH = path.join(
  INFRASTRUCTURE_PATH,
  "datasources",
);

const INFRASTRUCTURE_REPOSITORIES_PATH = path.join(
  INFRASTRUCTURE_PATH,
  "repositories",
);

export {
  PRISMA_SCHEMA_PATH,
  PRESENTATION_PATH,
  GLOBAL_ROUTES_PATH,
  DOMAIN_PATH,
  DOMAIN_DATASOURCES_PATH,
  DOMAIN_REPOSITORIES_PATH,
  DOMAIN_DTO_PATH,
  DOMAIN_ENTITIES_PATH,
  INFRASTRUCTURE_DATASOURCES_PATH,
  INFRASTRUCTURE_REPOSITORIES_PATH,
};

const PRISMA_SCALAR_TYPES = [
  "String",
  "Int",
  "Float",
  "Boolean",
  "DateTime",
  "Json",
  "BigInt",
  "Bytes",
  "Decimal",
] as const;

export const isScalarType = (type: string) => {
  return PRISMA_SCALAR_TYPES.includes(type as any);
};
