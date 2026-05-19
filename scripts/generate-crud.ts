import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";

const ROOT = process.cwd();

const PRISMA_SCHEMA_PATH = path.join(ROOT, "prisma/schema.prisma");
const PRESENTATION_PATH = path.join(ROOT, "src/presentation");
const GLOBAL_ROUTES_PATH = path.join(PRESENTATION_PATH, "routes.ts");
const DOMAIN_PATH = path.join(ROOT, "src/domain");
const DOMAIN_DATASOURCES_PATH = path.join(DOMAIN_PATH, "datasources");
const DOMAIN_REPOSITORIES_PATH = path.join(DOMAIN_PATH, "repositories");
const DOMAIN_DTO_PATH = path.join(DOMAIN_PATH, "dto");
const DOMAIN_ENTITIES_PATH = path.join(DOMAIN_PATH, "entities");

type PrismaModel = {
  name: string;
};

function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function toCamelFolder(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function pluralize(str: string) {
  if (str.endsWith("s")) return `${str}es`;
  if (str.endsWith("y")) return `${str.slice(0, -1)}ies`;

  return `${str}s`;
}

function parsePrismaModels(schema: string): PrismaModel[] {
  const modelRegex = /model\s+(\w+)\s+\{/g;

  const models: PrismaModel[] = [];

  let match;

  while ((match = modelRegex.exec(schema)) !== null) {
    models.push({
      name: match[1],
    });
  }

  return models;
}

function lowercaseFirst(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function entityName(model: string) {
  return pluralize(model);
}

function generateController(model: string) {
  const plural = pluralize(model);

  return `import { NextFunction, Request, Response } from "express";
import { ${model}Repository } from "../../domain/repositories/${toCamelFolder(
    model
  )}/${toCamelFolder(model)}.repository";
import { ${model}DtoValidator } from "../../domain/dto/${toCamelFolder(
    model
  )}/validator";

export class ${model}Controller {
    constructor(public readonly repository: ${model}Repository) {}

    get${plural} = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = ${model}DtoValidator.validateSearch${model}ParamsQueryDto(req.query)

            const [data, total] = await this.repository.get${plural}(
                searchQueryParams
            )

            res.json({
                status:'success',
                result:data,
                total:total,
                totalPages: Math.ceil(total / +limit),
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }

    get${model}ById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.get${model}ById(
                String(id)
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }

    update${model} = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = ${model}DtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.update${model}(
                updateBody,
                String(id)
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }

    delete${model} = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.delete${model}(
                String(id)
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }
}
`;
}

function generateRoutes(model: string) {
  const plural = pluralize(model);

  return `import { Router } from "express";
import { ${model}DatasourceImplementation } from "../../infrastructure/datasources/${toCamelFolder(
    model
  )}/${toCamelFolder(model)}.datasource.impl";
import { ${model}RepositoryImplementation } from "../../infrastructure/repositories/${toCamelFolder(
    model
  )}/${toCamelFolder(model)}.repository.impl";
import { ${model}Controller } from "./controller";

export class ${plural}Routes {

    static get routes() : Router {

        const router = Router();

        const datasource = new ${model}DatasourceImplementation();
        const repository = new ${model}RepositoryImplementation(datasource);
        const controller = new ${model}Controller(repository);

        router.get('/', controller.get${plural});
        router.get('/:id', controller.get${model}ById);
        router.put('/:id', controller.update${model});
        router.delete('/:id', controller.delete${model});

        return router
    }
}
`;
}

async function updateGlobalRoutes(
  model: string,
  useJwt: boolean
) {
  const plural = pluralize(model);

  const folderName = toCamelFolder(model);
  const kebabRoute = toKebabCase(model);

  let content = await fs.readFile(GLOBAL_ROUTES_PATH, "utf-8");

  const importLine = `import { ${plural}Routes } from "./${folderName}/routes";`;

  if (!content.includes(importLine)) {
    content = `${importLine}\n${content}`;
  }

  const middleware = useJwt
    ? "AuthMiddleware.jwtMiddleware(), "
    : "";

  const routeLine = `router.use('/${kebabRoute}', ${middleware}${plural}Routes.routes)`;

  const routerUseRegex = /(router\.use\(.*\)\s*)+(?![\s\S]*router\.use)/gm;

  if (!content.includes(routeLine)) {
    content = content.replace(
      routerUseRegex,
      (match) => `${match}\n${routeLine}`
    );
  }

  await fs.writeFile(GLOBAL_ROUTES_PATH, content);
}

function generateDatasource(model: string) {
  const folder = lowercaseFirst(model);

  return `import { Search${model}QueryParamsDto } from "../../dto/${folder}/search${model}Query.dto";
import { Update${model}Dto } from "../../dto/${folder}/update${model}.dto";
import { ${entityName(model)}Entity } from "../../entities/${folder}/${entityName(model).toLowerCase()}.entity";

export interface ${model}Datasource {
    get${model}ById(id: string) :Promise<${entityName(model)}Entity>;
    get${pluralize(model)}(queryParams: Search${model}QueryParamsDto): Promise<[${entityName(model)}Entity[], number]>
    update${model}(dto: Update${model}Dto, id:string): Promise<${entityName(model)}Entity>
    delete${model}(id:string): Promise<string>
}
`;
}

function generateRepository(model: string) {
  const folder = lowercaseFirst(model);

  return `import { Search${model}QueryParamsDto } from "../../dto/${folder}/search${model}Query.dto";
import { Update${model}Dto } from "../../dto/${folder}/update${model}.dto";
import { ${entityName(model)}Entity } from "../../entities/${folder}/${entityName(model).toLowerCase()}.entity";

export interface ${model}Repository {
    get${model}ById(id: string) :Promise<${entityName(model)}Entity>;
    get${pluralize(model)}(queryParams: Search${model}QueryParamsDto): Promise<[${entityName(model)}Entity[], number]>
    update${model}(dto: Update${model}Dto, id:string): Promise<${entityName(model)}Entity>
    delete${model}(id:string): Promise<string>
}
`;
}

function generateUpdateDto(model: string) {
  return `import { z } from 'zod'

export const update${model}Schema = z.object({

})

export type Update${model}Dto = z.infer<typeof update${model}Schema>
`;
}

function generateCreateDto(model: string) {
  return `import { z } from 'zod'

export const create${model}Schema = z.object({

})

export type Create${model}Dto = z.infer<typeof create${model}Schema>
`;
}

function generateSearchDto(model: string) {
  return `import { z } from 'zod'

export const search${model}QueryParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
})

export type Search${model}QueryParamsDto = z.infer<typeof search${model}QueryParamsSchema>
`;
}

function generateValidator(model: string) {
  return `import { search${model}QueryParamsSchema } from "./search${model}Query.dto";
import { update${model}Schema } from "./update${model}.dto";
import { create${model}Schema } from "./create${model}.dto";

export class ${model}DtoValidator {

    static validateCreateDto(props: unknown) {
        return create${model}Schema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return update${model}Schema.parse(props)
    }

    static validateSearch${model}ParamsQueryDto(props: unknown) {
        return search${model}QueryParamsSchema.parse(props)
    }
}
`;
}

async function generateDomainLayer(model: string) {
  const folder = lowercaseFirst(model);

  /*
    DATASOURCE
  */

  const datasourceFolder = path.join(
    DOMAIN_DATASOURCES_PATH,
    folder
  );

  await fs.ensureDir(datasourceFolder);

  await fs.writeFile(
    path.join(datasourceFolder, `${folder}.datasource.ts`),
    generateDatasource(model)
  );

  /*
    DTO
  */

  const dtoFolder = path.join(
    DOMAIN_DTO_PATH,
    folder
  );

  await fs.ensureDir(dtoFolder);

  await fs.writeFile(
    path.join(dtoFolder, `search${model}Query.dto.ts`),
    generateSearchDto(model)
  );

  await fs.writeFile(
    path.join(dtoFolder, `update${model}.dto.ts`),
    generateUpdateDto(model)
  );

  await fs.writeFile(
    path.join(dtoFolder, `create${model}.dto.ts`),
    generateCreateDto(model)
  );

  await fs.writeFile(
    path.join(dtoFolder, `validator.ts`),
    generateValidator(model)
  );

  /*
    REPOSITORY
  */

  const repositoryFolder = path.join(
    DOMAIN_REPOSITORIES_PATH,
    folder
  );

  await fs.ensureDir(repositoryFolder);

  await fs.writeFile(
    path.join(repositoryFolder, `${folder}.repository.ts`),
    generateRepository(model)
  );
}

async function main() {
  console.clear();

  console.log(
    chalk.magenta.bold(`
╔══════════════════════════════╗
║      D&D CRUD GENERATOR      ║
╚══════════════════════════════╝
`)
  );

  const schema = await fs.readFile(PRISMA_SCHEMA_PATH, "utf-8");

  const models = parsePrismaModels(schema);

  if (!models.length) {
    console.log(chalk.red("No se encontraron modelos en schema.prisma"));
    process.exit(0);
  }

  const { selectedModel } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedModel",
      message: "Selecciona un modelo:",
      choices: models.map((m) => m.name),
    },
  ]);

  const { useJwt } = await inquirer.prompt([
    {
      type: "confirm",
      name: "useJwt",
      message: "¿Usar JWT middleware?",
      default: true,
    },
  ]);

  const folderName = toCamelFolder(selectedModel);

  const modulePath = path.join(PRESENTATION_PATH, folderName);

  await fs.ensureDir(modulePath);

  await fs.writeFile(
    path.join(modulePath, "controller.ts"),
    generateController(selectedModel)
  );

  await fs.writeFile(
    path.join(modulePath, "routes.ts"),
    generateRoutes(selectedModel)
  );

  await updateGlobalRoutes(selectedModel, useJwt);
  await generateDomainLayer(selectedModel);

  console.log(
    chalk.green(`
✅ CRUD base generado correctamente para ${selectedModel}
`)
  );
}

main();