import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { ERRORS_TEXT } from "../../errors/errors-text";
import { validateStringWithEnum } from "../../helpers/string-enum-validation";
import { CharactersEnum } from "../../enums/characters.enum";

export default function userRegisterValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const nickname = req.body['nickname'];
  const email = req.body['email'];
  const password = req.body['password'];
  const confirmPassword = req.body['confirmPassword'];
  const character = req.body['character'];

  if (!nickname || !email || !password || !confirmPassword || !character) {
    res.status(400).send(ERRORS_TEXT.REQUIRED_PARAMETER_MISSING);
    next();
  }

  if (validator.isEmpty(nickname)) {
    res.status(400).send(ERRORS_TEXT.ENTER_NICKNAME);
    next();
  }

  if (!validator.isEmail(email)) {
    res.status(400).send(ERRORS_TEXT.INVALID_EMAIL);
    next();
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
    next();
  }

  if (confirmPassword !== password) {
    res.status(400).send(ERRORS_TEXT.PASSWORDS_DO_NOT_MATCH);
    next();
  }

  if (!validateStringWithEnum(character, CharactersEnum)) {
    res.status(400).send(ERRORS_TEXT.INVALID_CHARACTER);
    next();
  }
  next();
}
