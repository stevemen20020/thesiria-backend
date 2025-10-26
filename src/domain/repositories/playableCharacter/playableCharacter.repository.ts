import { PlayableCharacterEntity } from "../../entities";

export interface PlayableCharacterRepository {
    getPlayableCharacterById(id: string) :Promise<PlayableCharacterEntity>;
}