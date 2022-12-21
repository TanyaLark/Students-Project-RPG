import { WebSocket } from "ws";
import { MessageObjectInterface } from "../controllers/message-object.interface";

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

  static sendMessage(userId: string, message: MessageObjectInterface) {
    const socket = map.get(userId);
    socket.send(JSON.stringify(message));
  }

  static sendMessageToAll(senderId: string, message: MessageObjectInterface) {
    map.forEach((socket, userId) => {
      if (senderId !== userId) {
        socket.send(JSON.stringify(message));
      }
    });
  }
}