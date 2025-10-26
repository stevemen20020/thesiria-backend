import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { PlayableCharactersRoutes } from "./playableCharacter/routes";
import { AuthMiddleware } from "./middlewares";
export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        router.use('/user', UserRoutes.routes)

        router.use('/auth', AuthRoutes.routes);

        router.use('/playable-character', AuthMiddleware.jwtMiddleware(), PlayableCharactersRoutes.routes)

        return router;

    }
}