import { CharactersEnum } from "../../../enums/characters.enum";
import { User } from "../user";

export function buildUserRO(player: User): UserRO {
  return {
    id: player.id!,
    nickname: player.nickname,
    email: player.email,
    character: player.character
  }
}

export class UserRO {
  id: string;
  nickname: string;
  email: string;
  character: CharactersEnum;
}