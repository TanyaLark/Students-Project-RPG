import { Character } from "./character";
import { CONSTANTS } from "./constants";
import { CharacterInterface } from "./character.interface";
import { ERRORS_TEXT } from "./errors/errors-text";

export class Thief extends Character implements CharacterInterface {
  constructor(name: string, id: string) {
    super(name, CONSTANTS.DEFAULT_THIEF_HEALTH, id);
  }

  override canBeAttackedPhysically(): boolean {
    return !this.skillActive;
  }

  override canBeAttackedMagically(): boolean {
    return !this.skillActive;
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
    this.health = CONSTANTS.DEFAULT_THIEF_HEALTH;
  }

  override attack(enemy: CharacterInterface): CharacterInterface {
    if (!enemy.canBeAttackedPhysically()) {
      throw new Error(ERRORS_TEXT.CANNOT_ATTACK);
    }
    enemy.decreaseHealth(CONSTANTS.THIEF_ATTACK);
    return enemy;
  }
}