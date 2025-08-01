import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        router.use('/user', UserRoutes.routes)

        router.use('/auth', AuthRoutes.routes);

        return router;

    }
}