import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user/user.repository";
import { UserDtoValidator } from "../../domain/dto/user/validator";

export class UserController {
    constructor(public readonly repository: UserRepository) {}

    getUsers = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }
            const searchUserQueryParams = UserDtoValidator.validateSearchUserParamsQueryDto(req.query)

            const [data, total] = await this.repository.getUsers(
                searchUserQueryParams
            )

            res.json({
                status:'success',
                result:data,
                total:total,
                totalPages: Math.ceil(total / +limit),
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }

    getUserById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.getUserById(
                id
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    } 

    updateUser = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = UserDtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.updateUser(
                updateBody,
                id
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    } 

    deleteUser = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.deleteUser(
                id
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    } 
}