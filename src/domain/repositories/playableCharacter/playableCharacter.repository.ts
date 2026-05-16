import { CreatePlayableCharacterDto } from "../../dto/playableCharacter/createPlayableCharacter.dto";
import { PlayableCharacterEntity } from "../../entities";

export interface PlayableCharacterRepository {
    getPlayableCharacterById(id: string) :Promise<PlayableCharacterEntity>;
    createPlayableCharacter(dto: CreatePlayableCharacterDto): Promise<PlayableCharacterEntity>
}