import { NextFunction, Response, Request } from "express";
import { PlayableCharacterRepository } from "../../domain/repositories/playableCharacter/playableCharacter.repository";

export class AuthController {
    constructor(public readonly repository:PlayableCharacterRepository){}

    getPlayableCharacterById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const data = await this.repository.getPlayableCharacterById(req.params.id)

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