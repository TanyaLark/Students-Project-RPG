import { CharacterInterface } from "./character.interface";

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

  abstract useSkill(): void

  abstract attack(enemy: CharacterInterface): CharacterInterface

  abstract canBeAttackedPhysically(): boolean

  abstract canBeAttackedMagically(): boolean

  abstract revive(): void

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