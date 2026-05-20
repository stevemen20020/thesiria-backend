import { Router } from "express";
import { MissionsDatasourceImplementation } from "../../infrastructure/datasources/missions/missions.datasource.impl";
import { MissionsRepositoryImplementation } from "../../infrastructure/repositories/missions/missions.repository.impl";
import { MissionsController } from "./controller";

export class missionsRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new MissionsDatasourceImplementation();
        const repository = new MissionsRepositoryImplementation(datasource);
        const controller = new MissionsController(repository);

        router.get('/', controller.getMissions);
        router.get('/:id', controller.getMissionsById);
        router.put('/:id', controller.updateMissions);
        router.delete('/:id', controller.deleteMissions);
        router.post('/', controller.createMissions);

        return router
    }
}
