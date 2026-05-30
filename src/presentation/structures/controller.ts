import { NextFunction, Request, Response } from "express";
import { StructuresRepository } from "../../domain/repositories/structures/structures.repository";
import { structuresDtoValidator } from "../../domain/dto/structures/validator";

export class StructuresController {
    constructor(public readonly repository: StructuresRepository) {}

    getStructures = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = structuresDtoValidator.validateSearchStructuresParamsQueryDto(req.query)

            const [data, total] = await this.repository.getStructures(
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

    createStructures = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const registerBody = structuresDtoValidator.validateCreateDto(req.body)
            
            const data = await this.repository.createStructures(
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

    getStructuresById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.getStructuresById(
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

    updateStructures = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = structuresDtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.updateStructures(
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

    deleteStructures = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.deleteStructures(
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
