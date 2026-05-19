import { pluralize } from "../helpers/pluralize";
import { toCamelFolder } from "../helpers/toCamelFolder";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateRoutes = (model: string) => {
  const upperCaseModel = upperCaseFirst(model)
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

        router.get('/', controller.get${upperCaseFirst(plural)});
        router.get('/:id', controller.get${upperCaseModel}ById);
        router.put('/:id', controller.update${upperCaseModel});
        router.delete('/:id', controller.delete${upperCaseModel});

        return router
    }
}
`;
}