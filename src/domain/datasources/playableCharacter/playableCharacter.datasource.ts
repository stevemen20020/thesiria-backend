import { PlayableCharacterEntity } from "../../entities";

export interface PlayableCharacterDatasource {
    getById(id:string): Promise<PlayableCharacterEntity>
}