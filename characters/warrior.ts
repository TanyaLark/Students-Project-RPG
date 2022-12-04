import { Character } from "./character";
import { CONSTANTS } from "../constants";
import { CharacterInterface } from "./character.interface";
import { ERRORS_TEXT } from "../errors/errors-text";

export class Warrior extends Character implements CharacterInterface {
  constructor(nickName: string, id: string) {
    super(nickName, CONSTANTS.DEFAULT_WARRIOR_HEALTH, id);
  }

  override canBeAttackedPhysically(): boolean {
    return !this.skillActive;
  }

  override canBeAttackedMagically(): boolean {
    return true;
  }

  override useSkill(): void {
    if (this.skillBlock) {
      throw new Error(ERRORS_TEXT.CANNOT_USE_SKILL);
    }
    this.skillActive = true;
  }

  override revive(): void {
    if (this.health > 0) {
      return;
    }
    this.health = CONSTANTS.DEFAULT_WARRIOR_HEALTH;
  }

  override attack(enemy: CharacterInterface): CharacterInterface {
    if (!enemy.canBeAttackedPhysically()) {
      throw new Error(ERRORS_TEXT.CANNOT_ATTACK);
    }
    enemy.decreaseHealth(CONSTANTS.WARRIOR_ATTACK);
    return enemy;
  }

}
