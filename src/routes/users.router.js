const { Router } = require("express");
const { getAllUsers,
        getUniqueUser,
        insertUser,
        updateUser,
        deleteUser } = require ("../controller/users.js");

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUniqueUser)
usersRouter.post('/', insertUser)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

module.exports =  usersRouter
