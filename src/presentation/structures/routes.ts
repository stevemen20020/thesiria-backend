import { Router } from "express";
import { StructuresDatasourceImplementation } from "../../infrastructure/datasources/structures/structures.datasource.impl";
import { StructuresRepositoryImplementation } from "../../infrastructure/repositories/structures/structures.repository.impl";
import { StructuresController } from "./controller";

export class structuresRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new StructuresDatasourceImplementation();
        const repository = new StructuresRepositoryImplementation(datasource);
        const controller = new StructuresController(repository);

        router.get('/', controller.getStructures);
        router.get('/:id', controller.getStructuresById);
        router.put('/:id', controller.updateStructures);
        router.delete('/:id', controller.deleteStructures);
        router.post('/', controller.createStructures);

        return router
    }
}
