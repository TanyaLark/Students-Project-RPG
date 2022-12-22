import express, { Express, Request } from "express";
import { userRouter } from "./router/user-router";
import { classRouter } from "./router/class-router";
import { Server as HTTP_server } from "http";
import ws, { Server as WS_server } from "ws";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { wsEventHandler } from "./event-handler/ws-event-handler";

dotenv.config();

export class App {
  app: Express;
  httpServer: HTTP_server;
  wsServer: WS_server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000; //process.env.PORT || 8000;
  }

  useMiddleware() {
    this.app.use(bodyParser.json());
  }

  useRoutes() {
    this.app.use('/user', userRouter);
    this.app.use('/character', classRouter);
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.httpServer = this.app.listen(this.port);
    this.wsServer = new ws.Server({ noServer: true });
    this.wsServer.on('connection', (socket, req: Request) => {
      wsEventHandler(socket, req);
    })

    this.httpServer.on('upgrade', (request, socket, head) => {
      this.wsServer.handleUpgrade(request, socket, head, socket => {
        this.wsServer.emit('connection', socket, request);
      });
    });
  }
}