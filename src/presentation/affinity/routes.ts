import { Router } from "express";
import { affinityController } from "./controller";
import { AffinityDatasourceImplementation } from "../../infrastructure/datasources/affinity/affinity.datasource.impl";
import { AffinityRepositoryImplementation } from "../../infrastructure/repositories/affinity/affinity.repository.impl";

export class affinitiesRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new AffinityDatasourceImplementation();
        const repository = new AffinityRepositoryImplementation(datasource);
        const controller = new affinityController(repository);

        router.get('/', controller.getAffinities);
        router.get('/:id', controller.getAffinityById);
        router.post('/', controller.createAffinity)
        router.put('/:id', controller.updateAffinity);
        router.delete('/:id', controller.deleteAffinity);

        return router
    }
}
