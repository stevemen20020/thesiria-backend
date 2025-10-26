import { PlayableCharacterEntity } from "../../../domain/entities";
import { PlayableCharacterDatasource } from "../../../domain/datasources/playableCharacter/playableCharacter.datasource";
import { PlayableCharacterRepository } from "../../../domain/repositories/playableCharacter/playableCharacter.repository";


export class PlayableCharacterRepositoryImplementation implements PlayableCharacterRepository {

    constructor(
        private readonly datasource: PlayableCharacterDatasource
    ){}
    getPlayableCharacterById(id: string): Promise<PlayableCharacterEntity> {
        return this.datasource.getById(id)
    }
}