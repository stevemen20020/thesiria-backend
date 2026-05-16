import { PlayableCharacterEntity } from "../../../domain/entities";
import { PlayableCharacterDatasource } from "../../../domain/datasources/playableCharacter/playableCharacter.datasource";
import { PlayableCharacterRepository } from "../../../domain/repositories/playableCharacter/playableCharacter.repository";
import { CreatePlayableCharacterDto } from "../../../domain/dto/playableCharacter/createPlayableCharacter.dto";


export class PlayableCharacterRepositoryImplementation implements PlayableCharacterRepository {

    constructor(
        private readonly datasource: PlayableCharacterDatasource
    ){}
    createPlayableCharacter(dto: CreatePlayableCharacterDto): Promise<PlayableCharacterEntity> {
        return this.datasource.createPlayableCharacter(dto)
    }
    getPlayableCharacterById(id: string): Promise<PlayableCharacterEntity> {
        return this.datasource.getById(id)
    }
}