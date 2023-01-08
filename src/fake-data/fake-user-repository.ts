import { User } from "../entities/user/user";
import { randomUUID } from "crypto";

const PlayersArray: User[] = [];

export class PlayerRepository {

  constructor() {
  }

  async saveNewPlayer(user: User): Promise<User> {
    user.id = randomUUID();
    PlayersArray.push(user);
    return user;
  }

  async findOnePlayerById(userId: string): Promise<User | null> {
    const foundPlayer = PlayersArray.find((user: User) => {
      return user.id === userId;
    })
    if (foundPlayer) {
      return foundPlayer;
    }
    return null;
  }

  async findOnePlayerByEmail(userEmail: string): Promise<User | null> {
    const foundPlayer = PlayersArray.find((user: User) => {
      return user.email === userEmail;
    })
    if (foundPlayer) {
      return foundPlayer;
    }
    return null;
  }

  async deletePlayer(userId: string): Promise<User | null> {
    const userToDelete = this.findOnePlayerById(userId);
    const indexOfPlayerToDelete = PlayersArray.findIndex((user: User) => {
      return user.id === userId;
    });
    PlayersArray.splice(indexOfPlayerToDelete, 1);
    return userToDelete;
  }

  async savePlayer(user: User): Promise<void> {
    if (user.id) {
      await this.deletePlayer(user.id);
    }
    PlayersArray.push(user);
  }
}