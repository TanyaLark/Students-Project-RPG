import { CharacterInterface } from "../character.interface";
import { CharacterFactory } from "../character-factory/character-factory";
import { CharactersEnum } from "../../../enums/characters.enum";

export class Interaction {
  private characterFactory: CharacterFactory;

  constructor() {
    this.characterFactory = new CharacterFactory();
  }

  createCharacter(type: CharactersEnum, nickName: string, id: string): CharacterInterface {
    return this.characterFactory.createCharacter(type, nickName, id);
  }

  activateAttack(character: CharacterInterface, enemy: CharacterInterface) {
    character.attack(enemy)
  }

  activatePower(character: CharacterInterface, enemy: CharacterInterface): void {
    character.useSkill(enemy);
  };
}