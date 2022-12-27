import { NextFunction, Request, Response } from 'express';
import {
  userLoginService,
  userRegistrationService,
  userUpdateService
} from "../services/user-service/user.service";
import { RequestWithDecodedInfo } from "../middleware/auth/authorization";
import { buildUserRO } from "../entities/user/utils/build-user-response-object";
import { ERRORS_TEXT } from "../errors/errors-text";
import { generateJwtToken } from "../authorization/generate-jwt-token";
import { HttpError } from "../errors/http-error.class";

export async function userRegisterController(
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
  const savedPlayer = await userRegistrationService(nickname, email, password, confirmPassword, character);
  const response = buildUserRO(savedPlayer);
  res.status(201).send(response);
  next()
}

export async function userLoginController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const email = req.body['email'];
  const password = req.body['password'];
  const foundUser = await userLoginService(email);
  if (!foundUser) {
    next(new HttpError(401, ERRORS_TEXT.USER_NOT_FOUND, 'userLoginController'));
  }
  if (foundUser.email !== email || foundUser.password !== password) {
    next(new HttpError(401, ERRORS_TEXT.UNAUTHORIZED, 'userLoginController'));
  }

  res.send(generateJwtToken({
    email: foundUser.email,
    id: foundUser.id as string
  }));
  next();
}

export async function userUpdateController(req: RequestWithDecodedInfo, res: Response) {
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

  try {
    const foundUser = await userUpdateService(id, nickname, password, newPassword, confirmNewPassword, character);
    res.status(200).send(foundUser);
    return;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
    res.status(500).send(ERRORS_TEXT.UNKNOWN_SERVER_ERROR);
    return;
  }
}
