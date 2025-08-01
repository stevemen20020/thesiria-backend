import { Router } from "express";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user/user.datasource.impl";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user/user.repository.impl";
import { UserController } from "./controller";
import { AuthMiddleware } from '../middlewares/auth.middleware';


export class UserRoutes {

    static get routes() : Router {

        const router = Router();



        const datasource = new UserDatasourceImplementation(  );
        const repository = new UserRepositoryImplementation( datasource );
        const controller = new UserController( repository );

        router.get('/', AuthMiddleware.jwtMiddleware(), controller.getUsers);
        router.get('/:id', AuthMiddleware.jwtMiddleware(),controller.getUserById);
        router.put('/:id', AuthMiddleware.jwtMiddleware(),controller.updateUser);
        router.delete('/:id', AuthMiddleware.jwtMiddleware(),controller.deleteUser);

        return router
    }
}