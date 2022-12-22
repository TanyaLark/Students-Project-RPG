import { CharactersEnum } from "../../../enums/characters.enum";
import { Player } from "../../../player";

export function buildUserRO(player: Player): UserRO {
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