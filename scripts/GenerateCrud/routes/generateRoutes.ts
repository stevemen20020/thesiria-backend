import { toCamelFolder } from "../helpers/toCamelFolder";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateRoutes = (model: string) => {
  const upperCaseModel = upperCaseFirst(model)

  return `import { Router } from "express";
import { ${upperCaseModel}DatasourceImplementation } from "../../infrastructure/datasources/${toCamelFolder(
    model
  )}/${toCamelFolder(model)}.datasource.impl";
import { ${upperCaseModel}RepositoryImplementation } from "../../infrastructure/repositories/${toCamelFolder(
    model
  )}/${toCamelFolder(model)}.repository.impl";
import { ${upperCaseModel}Controller } from "./controller";

export class ${model}Routes {

    static get routes() : Router {

        const router = Router();

        const datasource = new ${upperCaseModel}DatasourceImplementation();
        const repository = new ${upperCaseModel}RepositoryImplementation(datasource);
        const controller = new ${upperCaseModel}Controller(repository);

        router.get('/', controller.get${upperCaseModel});
        router.get('/:id', controller.get${upperCaseModel}ById);
        router.put('/:id', controller.update${upperCaseModel});
        router.delete('/:id', controller.delete${upperCaseModel});
        router.post('/', controller.create${upperCaseModel});

        return router
    }
}
`;
}