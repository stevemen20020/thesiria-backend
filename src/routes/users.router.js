import { Router } from "express";
import { getAllUsers,
        getUniqueUser,
        insertUser,
        updateUser,
        deleteUser } from "../controller/users.js";

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUniqueUser)
usersRouter.post('/', insertUser)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
