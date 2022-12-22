import { CharactersEnum } from "./enums/characters.enum";

export const CONSTANTS = {
  DEFAULT_WARRIOR_HEALTH: 200,
  DEFAULT_MAGE_HEALTH: 80,
  DEFAULT_THIEF_HEALTH: 100,
  WARRIOR_ATTACK: 50,
  THIEF_ATTACK: 25,
  MAGE_ATTACK: 100,
};

export const availableCharacters = [
  {
    class: CharactersEnum.WARRIOR,
    health: CONSTANTS.DEFAULT_WARRIOR_HEALTH,
    attack: 'Sword attack doe`s -50 hp',
    power: 'Apply shield. \n' +
      'Ignores physical damage for 30 seconds'
  },
  {
    class: CharactersEnum.THIEF,
    health: CONSTANTS.DEFAULT_THIEF_HEALTH,
    attack: 'Bow attack doe`s -25 hp',
    power: 'Run away. \n' +
      'Makes invulnerable for 30 seconds'
  },
  {
    class: CharactersEnum.MAGE,
    health: CONSTANTS.DEFAULT_MAGE_HEALTH,
    attack: 'Fireball attack doe`s -100 hp',
    power: 'Enchant. \n' +
      'Forbids your enemy use skills for 30 seconds'
  },
];