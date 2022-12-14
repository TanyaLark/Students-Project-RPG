import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ws from 'ws';
import bodyParser from "body-parser";
import { generateJwtToken } from "./authorization/generate-jwt-token";
import { PlayerRepository } from "./fake-data/fake-user-repository";
import validator from 'validator';
import { CharactersEnum } from "./enums/characters.enum";
import { validateStringWithEnum } from "./helpers/string-enum-validation";
import { Player } from "./player";
import { availableCharacters, CONSTANTS } from "./constants";
import { EventsEnum } from "./enums/events.enum";
import { ERRORS_TEXT, SUCCESS_TEXT } from "./errors/errors-text";

dotenv.config();
const userRepository = new PlayerRepository();
const app: Express = express();
app.use(bodyParser.json())
app.post('/user/login', async (req: Request, res: Response) => {
  const email = req.body['email'];
  const password = req.body['password'];
  const foundUser = await userRepository.findOnePlayerByEmail(email);
  if (!foundUser) {
    res.status(401).send(ERRORS_TEXT.USER_NOT_FOUND);
    return;
  }
  if (foundUser.email !== email || foundUser.password !== password) {
    res.status(401).send(ERRORS_TEXT.UNAUTHORIZED);
    return;
  }

  res.send(generateJwtToken({
    email: foundUser.email,
    id: foundUser.id as string
  }));
});

app.post('/user/registration', async (req: Request, res: Response) => {
  const nickname = req.body['nickname'];
  const email = req.body['email'];
  const password = req.body['password'];
  const confirmPassword = req.body['confirmPassword'];
  const character = req.body['character'];

  if (validator.isEmpty(nickname)) {
    res.status(400).send(ERRORS_TEXT.ENTER_NICKNAME);
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send(ERRORS_TEXT.INVALID_EMAIL);
    return;
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  })) {
    res.status(400).send(ERRORS_TEXT.INVALID_PASSWORD);
    return;
  }

  if (confirmPassword !== password) {
    res.status(400).send(ERRORS_TEXT.PASSWORDS_DO_NOT_MATCH);
    return;
  }

  if (!validateStringWithEnum(character, CharactersEnum)) {
    res.status(400).send(ERRORS_TEXT.INVALID_CHARACTER);
    return;
  }

  const player = new Player(nickname, email, password, confirmPassword, character);
  const savedPlayer = await userRepository.saveNewPlayer(player);

  res.send(generateJwtToken({
    email: savedPlayer.email,
    id: savedPlayer.id as string
  }));
});

app.put('/user/update', async (req: Request, res: Response) => {
  const nickname = req.body['nickname'];
  const password = req.body['password'];
  const newPassword = req.body['newPassword'];
  const confirmNewPassword = req.body['confirmNewPassword'];
  const character = req.body['character'];

  const id = req.body['id'];
  const foundUser = await userRepository.findOnePlayerById(id);

  if (!foundUser) {
    res.status(400).send(ERRORS_TEXT.USER_NOT_FOUND);
    return;
  }

  if (newPassword === password) {
    res.status(400).send(ERRORS_TEXT.CREATE_NEW_PASSWORD);
    return;
  }

  if (newPassword !== confirmNewPassword) {
    res.status(400).send(ERRORS_TEXT.PASSWORDS_DO_NOT_MATCH);
    return;
  }

  foundUser.nickname = nickname;
  foundUser.password = newPassword;
  foundUser.confirmPassword = confirmNewPassword;
  foundUser.character = character;

  await userRepository.savePlayer(foundUser);

  res.status(200).send(SUCCESS_TEXT.UPDATE_SUCCESSFUL);
});

app.get('/characters', (req: Request, res: Response) => {
  res.status(200).send(availableCharacters);
});

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
