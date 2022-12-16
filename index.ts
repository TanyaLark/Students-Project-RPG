import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ws from 'ws';
import bodyParser from "body-parser";
import { EventsEnum } from "./enums/events.enum";
import { usersController } from "./controllers/user-controller";
import { classController } from "./controllers/class-controller";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use('/user', usersController);
app.use('/characters', classController);

const port = process.env.PORT || 8000;

const wsServer = new ws.Server({ noServer: true });

interface MessageObjectInterface {
  event_type: EventsEnum,
  event_data: {
    target_id?: string;
  },
}

wsServer.on('connection', socket => {

  socket.on('message', message => {
    const messageObject: MessageObjectInterface = JSON.parse(message.toString());
    switch (messageObject.event_type) {
      case EventsEnum.attack:
        console.log(`ATTACK ${messageObject.event_data.target_id}`);
        break;
      case EventsEnum.power:
        console.log(`POWER ${messageObject.event_data.target_id}`);
        break;
      case EventsEnum.message:
        console.log("MESSAGE");
        break;
      case EventsEnum.revival:
        console.log(`REVIVAL ${messageObject.event_data.target_id}`);
        break;
    }
  });

  socket.on('close', () => {
    console.log('WS close');
  })
});

const server = app.listen(port);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
