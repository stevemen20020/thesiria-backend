import { Router } from "express";
import { racesController } from "./controller";
import { RacesDatasourceImplementation } from "../../infrastructure/datasources/races/races.datasource.impl";
import { RacesRepositoryImplementation } from "../../infrastructure/repositories/races/races.repository.impl";

export class racesesRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new RacesDatasourceImplementation();
        const repository = new RacesRepositoryImplementation(datasource);
        const controller = new racesController(repository);

        router.get('/', controller.getRaceses);
        router.get('/:id', controller.getRacesById);
        router.put('/:id', controller.updateRaces);
        router.delete('/:id', controller.deleteRaces);
        router.post('/', controller.createRaces)

        return router
    }
}
