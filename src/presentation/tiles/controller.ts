import { NextFunction, Request, Response } from "express";
import { TilesRepository } from "../../domain/repositories/tiles/tiles.repository";
import { tilesDtoValidator } from "../../domain/dto/tiles/validator";
import { ImageRepository } from "../../domain/repositories/cloudinary/image.repository";

export class TilesController {
    constructor(public readonly repository: TilesRepository, public readonly imageRepository:ImageRepository) {}

    getTiles = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const searchQueryParams = tilesDtoValidator.validateSearchTilesParamsQueryDto(req.query)

            const [data, total] = await this.repository.getTiles(
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

    createTiles = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const registerBody = tilesDtoValidator.validateCreateDto(req.body)

            let imageUrl: string | undefined;
            let imagePublicId: string | undefined;

            if(req.file) {
                const uploadedImage = 
                    await this.imageRepository.uploadImage(
                        req.file.buffer, 
                        "tiles"
                    );
                imageUrl = uploadedImage.secureUrl;
                imagePublicId = uploadedImage.publicId;
            }
            
            const data = await this.repository.createTiles(
                {...registerBody, image: imageUrl ?? "", image_public_id: imagePublicId}
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

    getTilesById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const data = await this.repository.getTilesById(
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

    updateTiles = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const updateBody = tilesDtoValidator.validateUpdateDto(req.body)

            const existingTile = await this.repository.getTilesById(String(id));

            if (req.file) {
                if (existingTile.image_public_id) {
                    await this.imageRepository.deleteImage(
                        existingTile.image_public_id
                    );
                }

                const uploadedImage =
                    await this.imageRepository.uploadImage(
                        req.file.buffer,
                        "tiles"
                    );

                updateBody.image =
                    uploadedImage.secureUrl;

                updateBody.image_public_id =
                    uploadedImage.publicId;
            }

            const data = await this.repository.updateTiles(
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

    deleteTiles = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            const existingTile = await this.repository.getTilesById(String(id));

            if(existingTile.image_public_id) {
                this.imageRepository.deleteImage(existingTile.image_public_id)
            }

            const data = await this.repository.deleteTiles(
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
