import { Router } from "express";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user/user.datasource.impl";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user/user.repository.impl";
import { AuthController } from "./controller";
import { AuthDatasourceImplementation } from "../../infrastructure/datasources/auth/auth.datasource.impl";
import { AuthRepositoryImplementation } from "../../infrastructure/repositories/auth/auth.repository.impl";


export class AuthRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new AuthDatasourceImplementation(  )
        const repository = new AuthRepositoryImplementation( datasource )
        const controller = new AuthController( repository );

        router.post('/login',controller.login);
        router.post('/',controller.register);

        return router
    }
}