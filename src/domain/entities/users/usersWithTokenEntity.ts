import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
import { UsersEntity } from "./users.entity";

export interface UsersWithTokenEntity {
    user:UsersEntity,
    token:string
    playableCharacter?:PlayableCharacterEntity
}
