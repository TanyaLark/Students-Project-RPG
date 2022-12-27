import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { ERRORS_TEXT } from "../../errors/errors-text";
import { validateStringWithEnum } from "../../helpers/string-enum-validation";
import { CharactersEnum } from "../../enums/characters.enum";
import { HttpError } from "../../errors/http-error.class";

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
    next(new HttpError(400, ERRORS_TEXT.REQUIRED_PARAMETER_MISSING, 'validation'));
  }

  if (validator.isEmpty(nickname)) {
    next(new HttpError(400, ERRORS_TEXT.ENTER_NICKNAME, 'validation'));
  }

  if (!validator.isEmail(email)) {
    next(new HttpError(400, ERRORS_TEXT.INVALID_EMAIL, 'validation'));
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  })) {
    next(new HttpError(400, ERRORS_TEXT.INVALID_PASSWORD, 'validation'));
  }

  if (confirmPassword !== password) {
    next(new HttpError(400, ERRORS_TEXT.PASSWORDS_DO_NOT_MATCH, 'validation'));
  }

  if (!validateStringWithEnum(character, CharactersEnum)) {
    next(new HttpError(400, ERRORS_TEXT.INVALID_CHARACTER, 'validation'));
  }

  next();
}
