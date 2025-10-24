import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface UsersEntity {
  id: string;
  userName: string;
  name?: string;
  lastName: string;
  email: string;
  password: string;
  playableCharacter?: PlayableCharacterEntity[];
}
