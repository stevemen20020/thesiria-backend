import { NextFunction, Request, Response } from "express";
import { MissionsRepository } from "../../domain/repositories/missions/missions.repository";
import { missionsDtoValidator } from "../../domain/dto/missions/validator";

export class MissionsController {
    constructor(public readonly repository: MissionsRepository) {}

    getMissions = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = missionsDtoValidator.validateSearchMissionsParamsQueryDto(req.query)

            const [data, total] = await this.repository.getMissions(
                searchQueryParams
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

    createMissions = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const registerBody = missionsDtoValidator.validateCreateDto(req.body)
            
            const data = await this.repository.createMissions(
                registerBody
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

    getMissionsById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.getMissionsById(
                String(id)
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

    updateMissions = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = missionsDtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.updateMissions(
                updateBody,
                String(id)
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

    deleteMissions = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.deleteMissions(
                String(id)
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
