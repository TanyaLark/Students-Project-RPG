import { CharacterInterface } from "./character.interface";
import { ERRORS_TEXT } from "./errors/errors-text";

export abstract class Character implements CharacterInterface {
  public nickName: string;
  public health: number;
  public id: string;
  protected skillActive = false; //состояния: применил/не применил Хочет ли применить умение персонаж

  protected skillBlock = false; //состояния: заколдован()/не заколдован()  Персонаж заколдован магом и не может применить умение

  protected constructor(nickName: string, health: number, id: string) {
    this.nickName = nickName;
    this.health = health;
    this.id = id;
  }

  useSkill() {
    throw new Error(ERRORS_TEXT.METHOD_NOT_IMPLEMENTED);
  }

  attack(enemy: CharacterInterface): CharacterInterface {
    throw new Error(ERRORS_TEXT.METHOD_NOT_IMPLEMENTED);
  }

  canBeAttackedPhysically(): boolean {
    throw new Error(ERRORS_TEXT.METHOD_NOT_IMPLEMENTED);
  }

  canBeAttackedMagically(): boolean {
    throw new Error(ERRORS_TEXT.METHOD_NOT_IMPLEMENTED);
  }

  revive(): void {
    throw new Error(ERRORS_TEXT.METHOD_NOT_IMPLEMENTED);
  }

  decreaseHealth(damageHealthValue: number): void {
    this.health = this.health - damageHealthValue;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  blockSkill(): void {
    this.skillBlock = true;
  }
}