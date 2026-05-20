import { Router } from "express";
import { ElementsDatasourceImplementation } from "../../infrastructure/datasources/elements/elements.datasource.impl";
import { ElementsRepositoryImplementation } from "../../infrastructure/repositories/elements/elements.repository.impl";
import { ElementsController } from "./controller";

export class elementsRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new ElementsDatasourceImplementation();
        const repository = new ElementsRepositoryImplementation(datasource);
        const controller = new ElementsController(repository);

        router.get('/', controller.getElements);
        router.get('/:id', controller.getElementsById);
        router.put('/:id', controller.updateElements);
        router.delete('/:id', controller.deleteElements);
        router.post('/', controller.createElements);

        return router
    }
}
