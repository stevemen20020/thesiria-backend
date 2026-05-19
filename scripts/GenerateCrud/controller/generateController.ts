import { pluralize } from "../helpers/pluralize";
import { toCamelFolder } from "../helpers/toCamelFolder";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateController = (model: string) => {
  const plural = upperCaseFirst(pluralize(model));
  const upperCaseModel = upperCaseFirst(model)

  return `import { NextFunction, Request, Response } from "express";
import { ${model}Repository } from "../../domain/repositories/${toCamelFolder(
    model
  )}/${toCamelFolder(model)}.repository";
import { ${model}DtoValidator } from "../../domain/dto/${toCamelFolder(
    model
  )}/validator";

export class ${model}Controller {
    constructor(public readonly repository: ${model}Repository) {}

    get${plural} = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = ${model}DtoValidator.validateSearch${upperCaseModel}ParamsQueryDto(req.query)

            const [data, total] = await this.repository.get${plural}(
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

    get${upperCaseModel}ById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.get${upperCaseModel}ById(
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

    update${upperCaseModel} = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = ${model}DtoValidator.validateUpdateDto(req.body)

            const data = await this.repository.update${upperCaseModel}(
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

    delete${upperCaseModel} = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.delete${upperCaseModel}(
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
`;
}