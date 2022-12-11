import { CharacterInterface } from "../character.interface";
import { CharactersEnum } from "../../enums/characters.enum";

export abstract class AbstractCharacterFactory {
  abstract createCharacter(character: CharactersEnum, nickName: string, id: string): CharacterInterface;
}