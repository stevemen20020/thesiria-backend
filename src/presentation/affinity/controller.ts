import { NextFunction, Request, Response } from "express";
import { affinityRepository } from "../../domain/repositories/affinity/affinity.repository";
import { affinityDtoValidator } from "../../domain/dto/affinity/validator";

export class affinityController {
    constructor(public readonly repository: affinityRepository) {}

    getAffinities = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = affinityDtoValidator.validateSearchAffinityParamsQueryDto(req.query)

            const [data, total] = await this.repository.getAffinities(
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

    createAffinity = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const registerBody = affinityDtoValidator.validateCreateDto(req.body)
            
            const data = await this.repository.createAffinity(
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

    getAffinityById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.getAffinityById(
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

    updateAffinity = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = affinityDtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.updateAffinity(
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

    deleteAffinity = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.deleteAffinity(
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
