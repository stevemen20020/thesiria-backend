import { Router } from "express";
import { racesDatasourceImplementation } from "../../infrastructure/datasources/races/races.datasource.impl";
import { racesRepositoryImplementation } from "../../infrastructure/repositories/races/races.repository.impl";
import { racesController } from "./controller";

export class racesesRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new racesDatasourceImplementation();
        const repository = new racesRepositoryImplementation(datasource);
        const controller = new racesController(repository);

        router.get('/', controller.getRaceses);
        router.get('/:id', controller.getRacesById);
        router.put('/:id', controller.updateRaces);
        router.delete('/:id', controller.deleteRaces);

        return router
    }
}
