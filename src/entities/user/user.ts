import { CharactersEnum } from "../../enums/characters.enum";

export class User {
  public nickname: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public character: CharactersEnum;
  public id?: string;

  constructor(nickname: string,
              email: string,
              password: string,
              confirmPassword: string,
              character: CharactersEnum,
              id?: string) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.character = character;
    this.id = id;
  }
}