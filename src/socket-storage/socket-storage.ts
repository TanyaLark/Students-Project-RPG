import { WebSocket } from "ws";

const map = new Map();

export class SocketStorage {
  static addSocketToStorage(userId: string, socket: WebSocket): void {
    map.set(userId, socket);
  }

  static deleteSocketFromStorage(userId: string): void {
    map.delete(userId);
  }

  static getSocket(userId: string): WebSocket {
    return map.get(userId);
  }

  static getAllSockets(): {
    userId: string,
    socket: WebSocket;
  }[] {
    const socketArray: {
      userId: string,
      socket: WebSocket;
    }[] = [];
    map.forEach((socket, userId) => {
      socketArray.push({
        userId: userId,
        socket: socket,
      });
    });
    return socketArray;
  }
}
