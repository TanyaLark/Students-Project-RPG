import ws from "ws";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { SocketStorage } from "../socket-storage/socket-storage";
import { eventValidator } from "../middleware/validators/event-validator";
import { MessageObjectInterface } from "../controllers/message-object.interface";
import { handleEvent } from "../controllers/events-controller";

export function wsEventHandler(socket: ws.WebSocket, request: Request) {
  let userId: any;
  try {
    const token = request.headers.token as string;
    userId = (jwt.verify(token, process.env.JWT_SECRET as string) as any).id;
  } catch (e) {
    console.error(e);
    socket.close();
  }
  console.log('connection event triggered');
  SocketStorage.addSocketToStorage(userId, socket);

  socket.on('message', message => {
    try {
      eventValidator(message);
      const messageObject: MessageObjectInterface = JSON.parse(message.toString());
      handleEvent(messageObject, userId);
    } catch (e) {
      console.error(e);
      socket.close();
    }

  });

  socket.on('close', () => {
    SocketStorage.deleteSocketFromStorage(userId);
    console.log('WS close');
  })
}