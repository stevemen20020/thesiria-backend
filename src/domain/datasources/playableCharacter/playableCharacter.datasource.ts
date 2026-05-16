import { CreatePlayableCharacterDto } from "../../dto/playableCharacter/createPlayableCharacter.dto";
import { PlayableCharacterEntity } from "../../entities";

export interface PlayableCharacterDatasource {
    getById(id:string): Promise<PlayableCharacterEntity>
    createPlayableCharacter(dto: CreatePlayableCharacterDto): Promise<PlayableCharacterEntity>
}