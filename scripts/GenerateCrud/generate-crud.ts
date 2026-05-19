import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import {
  DOMAIN_DATASOURCES_PATH,
  DOMAIN_DTO_PATH,
  DOMAIN_REPOSITORIES_PATH,
  INFRASTRUCTURE_DATASOURCES_PATH,
  INFRASTRUCTURE_REPOSITORIES_PATH,
  PRESENTATION_PATH,
  PRISMA_SCHEMA_PATH,
} from "./generate-crud.constants";
import { toCamelFolder } from "./helpers/toCamelFolder";
import { lowercaseFirst } from "./helpers/lowerCaseFirst";
import { generateController } from "./controller/generateController";
import { generateRoutes } from "./routes/generateRoutes";
import { updateGlobalRoutes } from "./routes/updateRoutes";
import { generateDatasource } from "./datasource/generateDatasource";
import { generateUpdateDto } from "./dto/generateUpdateDto";
import { generateCreateDto } from "./dto/generateCreateDto";
import { generateSearchDto } from "./dto/generateSearchDto";
import { generateValidator } from "./dto/generateValidatorDto";
import { upperCaseFirst } from "./helpers/upperCaseFirst";
import { generateRepository } from "./repository/generateRepository";
import { PrismaModel } from "./generate-crud.types";
import { select } from "@inquirer/prompts";
import { parsePrismaSchema } from "./helpers/parsePrismaSchema";
import { generateDatasourceImpl } from "./infrastructure/generateDatasourceImpl";
import { generateRepositoryImpl } from "./infrastructure/generateRepositoryImpl";

const generateDomainLayer = async (model: PrismaModel) => {
  const upperCaseModel = upperCaseFirst(model.name);

  const folder = lowercaseFirst(model.name);

  const datasourceFolder = path.join(DOMAIN_DATASOURCES_PATH, folder);

  await fs.ensureDir(datasourceFolder);

  await fs.writeFile(
    path.join(datasourceFolder, `${folder}.datasource.ts`),
    generateDatasource(model.name),
  );

  const dtoFolder = path.join(DOMAIN_DTO_PATH, folder);

  await fs.ensureDir(dtoFolder);

  await fs.writeFile(
    path.join(dtoFolder, `search${upperCaseModel}Query.dto.ts`),
    generateSearchDto(model.name),
  );

  await fs.writeFile(
    path.join(dtoFolder, `update${upperCaseModel}.dto.ts`),
    generateUpdateDto(model),
  );

  await fs.writeFile(
    path.join(dtoFolder, `create${upperCaseModel}.dto.ts`),
    generateCreateDto(model),
  );

  await fs.writeFile(
    path.join(dtoFolder, `validator.ts`),
    generateValidator(model.name),
  );

  const repositoryFolder = path.join(DOMAIN_REPOSITORIES_PATH, folder);

  await fs.ensureDir(repositoryFolder);

  await fs.writeFile(
    path.join(repositoryFolder, `${folder}.repository.ts`),
    generateRepository(model.name),
  );
};

const generatePresentationLayer = async (
  model: PrismaModel,
  useJwt: boolean,
) => {
  const folderName = toCamelFolder(model.name);

  const modulePath = path.join(PRESENTATION_PATH, folderName);

  await fs.ensureDir(modulePath);

  await fs.writeFile(
    path.join(modulePath, "controller.ts"),
    generateController(model.name),
  );

  await fs.writeFile(
    path.join(modulePath, "routes.ts"),
    generateRoutes(model.name),
  );

  await updateGlobalRoutes(model.name, useJwt);
};

const generateInfrastructureLayer = async (model: PrismaModel) => {
  const lowerModel = lowercaseFirst(model.name);

  /*
      DATASOURCE IMPL
    */

  const datasourceFolder = path.join(
    INFRASTRUCTURE_DATASOURCES_PATH,
    lowerModel,
  );

  await fs.ensureDir(datasourceFolder);

  await fs.writeFile(
    path.join(datasourceFolder, `${lowerModel}.datasource.impl.ts`),
    generateDatasourceImpl(model),
  );

  /*
      REPOSITORY IMPL
    */

  const repositoryFolder = path.join(
    INFRASTRUCTURE_REPOSITORIES_PATH,
    lowerModel,
  );

  await fs.ensureDir(repositoryFolder);

  await fs.writeFile(
    path.join(repositoryFolder, `${lowerModel}.repository.impl.ts`),
    generateRepositoryImpl(model),
  );
};

async function main() {
  console.clear();

  console.log(
    chalk.magenta.bold(`
╔══════════════════════════════╗
║      D&D CRUD GENERATOR      ║
╚══════════════════════════════╝
`),
  );

  const schema = await fs.readFile(PRISMA_SCHEMA_PATH, "utf-8");

  const models = parsePrismaSchema(schema);

  if (!models.length) {
    console.log(chalk.red("No se encontraron modelos en schema.prisma"));
    process.exit(0);
  }

  const selectedModel = await select({
    message: "Selecciona un modelo:",
    choices: models.map((model) => ({
      name: model.name,
      value: model.name,
      description: `${model.fields.length} fields`,
    })),
  });

  const { useJwt } = await inquirer.prompt([
    {
      type: "confirm",
      name: "useJwt",
      message: "¿Usar JWT middleware?",
      default: true,
    },
  ]);

  const selectedModelData = models.find((m) => m.name === selectedModel);

  if (!selectedModelData) {
    throw new Error("Model not found");
  }
  await generatePresentationLayer(selectedModelData, useJwt);
  await generateDomainLayer(selectedModelData);
  await generateInfrastructureLayer(selectedModelData);

  console.log(
    chalk.green(`
✅ CRUD base generado correctamente para ${selectedModel}
`),
  );
}

main();
