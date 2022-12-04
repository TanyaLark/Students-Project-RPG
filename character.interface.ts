export interface CharacterInterface {
  useSkill(enemy?: CharacterInterface): void;

  attack(enemy: CharacterInterface): CharacterInterface;

  canBeAttackedPhysically(): boolean;

  canBeAttackedMagically(): boolean;

  revive(): void;

  decreaseHealth(damageHealthValue: number): void;

  blockSkill(): void;
}