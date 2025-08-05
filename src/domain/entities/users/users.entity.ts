import { PlayableCharacterEntity } from "../playable_character/playableCharacter.entity";
export interface UsersEntity {
  id: number;
  username: string;
  name?: string;
  last_name: string;
  email: string;
  password: string;
  playable_character?: PlayableCharacterEntity[];
}
