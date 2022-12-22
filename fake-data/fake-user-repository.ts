import { Player } from "../player";
import { randomUUID } from "crypto";

const PlayersArray: Player[] = [];

export class PlayerRepository {

  constructor() {
  }

  async saveNewPlayer(user: Player): Promise<Player> {
    user.id = randomUUID();
    PlayersArray.push(user);
    return user;
  }

  async findOnePlayerById(userId: string): Promise<Player | null> {
    const foundPlayer = PlayersArray.find((user: Player) => {
      return user.id === userId;
    })
    if (foundPlayer) {
      return foundPlayer;
    }
    return null;
  }

  async findOnePlayerByEmail(userEmail: string): Promise<Player | null> {
    const foundPlayer = PlayersArray.find((user: Player) => {
      return user.email === userEmail;
    })
    if (foundPlayer) {
      return foundPlayer;
    }
    return null;
  }

  async deletePlayer(userId: string): Promise<Player | null> {
    const userToDelete = this.findOnePlayerById(userId);
    const indexOfPlayerToDelete = PlayersArray.findIndex((user: Player) => {
      return user.id === userId;
    });
    PlayersArray.splice(indexOfPlayerToDelete, 1);
    return userToDelete;
  }

  async savePlayer(user: Player): Promise<void> {
    if (user.id) {
      await this.deletePlayer(user.id);
    }
    PlayersArray.push(user);
  }
}