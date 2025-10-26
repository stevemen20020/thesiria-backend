import { Router } from "express";
import { AuthController } from "./controller";
import { PlayableCharacterDatasourceImplementation } from "../../infrastructure/datasources/playableCharacter/playableCharacter.datasource.impl";
import { PlayableCharacterRepositoryImplementation } from "../../infrastructure/repositories/playableCharacter/playableCharacter.repository.impl";


export class PlayableCharactersRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new PlayableCharacterDatasourceImplementation(  )
        const repository = new PlayableCharacterRepositoryImplementation( datasource )
        const controller = new AuthController( repository );

        router.get('/:id',controller.getPlayableCharacterById);

        return router
    }
}