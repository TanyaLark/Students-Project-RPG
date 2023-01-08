import { AbstractCharacterFactory } from "./abstract-character-factory";
import { CharacterInterface } from "../character.interface";
import { CharactersEnum } from "../../../enums/characters.enum";
import { Warrior } from "../warrior";
import { Thief } from "../thief";
import { Mage } from "../mage";
import { ERRORS_TEXT } from "../../../errors/errors-text";

export class CharacterFactory extends AbstractCharacterFactory {
  override createCharacter(character: CharactersEnum, nickName: string, id: string): CharacterInterface {
    switch (character) {
      case CharactersEnum.WARRIOR:
        return new Warrior(nickName, id);
      case CharactersEnum.THIEF:
        return new Thief(nickName, id);
      case CharactersEnum.MAGE:
        return new Mage(nickName, id);
      default:
        throw new Error(ERRORS_TEXT.WRONG_CHARACTER_TYPE);
    }
  }
}