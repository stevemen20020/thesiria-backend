import { Router } from "express";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user/user.datasource.impl";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user/user.repository.impl";
import { UserController } from "./controller";


export class UserRoutes {

    static get routes() : Router {

        const router = Router();



        const datasource = new UserDatasourceImplementation(  );
        const repository = new UserRepositoryImplementation( datasource );
        const controller = new UserController( repository );

        router.get('/',controller.getUsers);
        router.get('/:id',controller.getUserById);
        router.put('/:id',controller.updateUser);
        router.delete('/:id',controller.deleteUser);

        return router
    }
}