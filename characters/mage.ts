import { Character } from "./character";
import { CONSTANTS } from "../constants";
import { CharacterInterface } from "./character.interface";
import { ERRORS_TEXT } from "../errors/errors-text";

export class Mage extends Character implements CharacterInterface {
  constructor(name: string, id: string) {
    super(name, CONSTANTS.DEFAULT_MAGE_HEALTH, id);
  }

  canBeAttackedPhysically(): boolean {
    return true;
  }

  canBeAttackedMagically(): boolean {
    return true;
  }

  useSkill(enemy?: CharacterInterface): void {
    if (!enemy) {
      throw new Error(ERRORS_TEXT.ENEMY_IS_MISSING);
    }
    if (enemy.canBeAttackedMagically() && !this.skillBlock) {
      enemy.blockSkill();
    }
  }

  revive(): void {
    if (this.health > 0) {
      return;
    }
    this.health = CONSTANTS.DEFAULT_MAGE_HEALTH;
  }

  attack(enemy: CharacterInterface): CharacterInterface {
    if (!enemy.canBeAttackedMagically()) {
      throw new Error(ERRORS_TEXT.CANNOT_ATTACK);
    }
    enemy.decreaseHealth(CONSTANTS.MAGE_ATTACK);
    return enemy;
  }

}