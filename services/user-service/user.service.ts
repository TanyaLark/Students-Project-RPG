import { Player } from "../../player";
import { PlayerRepository } from "../../fake-data/fake-user-repository";
import { buildUserRO } from "./utils/build-user-response-object";
import { NextFunction, Request, Response } from "express";
import { ERRORS_TEXT } from "../../errors/errors-text";
import { generateJwtToken } from "../../authorization/generate-jwt-token";
import { RequestWithDecodedInfo } from "../../middleware/auth/authorization";

const userRepository = new PlayerRepository();

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const {
    nickname,
    email,
    password,
    confirmPassword,
    character,
  } = req.body;
  const player = new Player(nickname, email, password, confirmPassword, character);
  const savedPlayer = await userRepository.saveNewPlayer(player);
  const response = buildUserRO(savedPlayer);
  res.status(201).send(response);
  next()
}

export async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
  next();
}

export async function userUpdate(req: RequestWithDecodedInfo, res: Response) {
  const nickname = req.body['nickname'];
  const password = req.body['password'];
  const newPassword = req.body['newPassword'];
  const confirmNewPassword = req.body['confirmNewPassword'];
  const character = req.body['character'];

  const id = req?.decodedInfoFromJWT?.id;

  if (!id) {
    res.status(400).send(ERRORS_TEXT.UNAUTHORIZED);
    return;
  }
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
  const response = buildUserRO(foundUser);
  res.status(200).send(response);
}
