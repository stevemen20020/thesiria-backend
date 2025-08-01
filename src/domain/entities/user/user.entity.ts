import { PlayableCharacter } from "../playable_character/playableCharacter.entity";

export interface UserEntity {
    id:string,
    userName:string,
    name:string | null,
    lastName:string,
    email:string,
    password?:string,

    playableCharacter?:PlayableCharacter[]
}