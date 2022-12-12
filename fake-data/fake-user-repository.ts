import { Player } from "../player";
import { randomUUID } from "crypto";

export class PlayerRepository {
  private PlayersArray: Player[] = [];

  constructor() {
  }

  async saveNewPlayer(user: Player): Promise<Player> {
    user.id = randomUUID();
    this.PlayersArray.push(user);
    return user;
  }

  async findOnePlayerById(userId: string): Promise<Player | null> {
    const foundPlayer = this.PlayersArray.find((user: Player) => {
      return user.id === userId;
    })
    if (foundPlayer) {
      return foundPlayer;
    }
    return null;
  }

  async findOnePlayerByEmail(userEmail: string): Promise<Player | null> {
    const foundPlayer = this.PlayersArray.find((user: Player) => {
      return user.email === userEmail;
    })
    if (foundPlayer) {
      return foundPlayer;
    }
    return null;
  }

  async deletePlayer(userId: string): Promise<Player | null> {
    const userToDelete = this.findOnePlayerById(userId);
    const indexOfPlayerToDelete = this.PlayersArray.findIndex((user: Player) => {
      return user.id === userId;
    });
    this.PlayersArray.splice(indexOfPlayerToDelete, 1);
    return userToDelete;
  }

  async savePlayer(user: Player): Promise<void> {
    if (user.id) {
      await this.deletePlayer(user.id);
    }
    this.PlayersArray.push(user);
  }
}