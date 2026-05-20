import { NextFunction, Request, Response } from "express";
import { ElementsRepository } from "../../domain/repositories/elements/elements.repository";
import { elementsDtoValidator } from "../../domain/dto/elements/validator";

export class ElementsController {
    constructor(public readonly repository: ElementsRepository) {}

    getElements = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = elementsDtoValidator.validateSearchElementsParamsQueryDto(req.query)

            const [data, total] = await this.repository.getElements(
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

    createElements = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const registerBody = elementsDtoValidator.validateCreateDto(req.body)
            
            const data = await this.repository.createElements(
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

    getElementsById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.getElementsById(
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

    updateElements = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = elementsDtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.updateElements(
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

    deleteElements = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.deleteElements(
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
