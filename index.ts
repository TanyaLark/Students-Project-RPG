import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();

const app: Express = express();
app.get('/', (req: Request, res: Response) => {
  res.send('hello from HTTP server!');
});

// const httpPort = process.env.HTTP_PORT || 8001;
const wsPort = process.env.PORT || 8000;

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  console.log('WS work');
  socket.on('message', message => {
    console.log(message.toString())
    socket.send('hello from server');
  });

  socket.on('close', () => {
    console.log('WS close');
  })
});

const server = app.listen(wsPort);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
