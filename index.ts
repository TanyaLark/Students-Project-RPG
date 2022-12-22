import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ws from 'ws';
import bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import { MessageObjectInterface } from "./controllers/message-object.interface";
import { handleEvent } from "./controllers/events-controller";
import { SocketStorage } from "./socket-storage/socket-storage";
import { userRouter } from "./router/user-router";
import { classRouter } from "./router/class-router";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/characters', classRouter);

const port = process.env.PORT || 8000;
const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket, request: Request) => {
  // console.log(request.headers.token);
  let userId: any;
  try {
    const token = request.headers.token as string;
    userId = (jwt.verify(token, process.env.JWT_SECRET as string) as any).id;
  } catch (e) {
    socket.close();
  }
  console.log('connection event triggered');
  SocketStorage.addSocketToStorage(userId, socket);

  //***
  socket.on('message', message => {

    const messageObject: MessageObjectInterface = JSON.parse(message.toString());
    //** event controller
    handleEvent(messageObject, userId);
  });

  socket.on('close', () => {
    SocketStorage.deleteSocketFromStorage(userId);
    console.log('WS close');
  })
});

const server = app.listen(port);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
