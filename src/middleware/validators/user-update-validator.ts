import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { ERRORS_TEXT } from "../../errors/errors-text";
import { validateStringWithEnum } from "../../helpers/string-enum-validation";
import { CharactersEnum } from "../../enums/characters.enum";
import { HttpError } from "../../errors/http-error.class";

export default function userUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const nickname = req.body['nickname'];
  const email = req.body['email'];
  const password = req.body['password'];
  const newPassword = req.body['newPassword'];
  const confirmNewPassword = req.body['confirmNewPassword'];
  const character = req.body['character'];

  if (!nickname || !email || !password || !newPassword || !confirmNewPassword || !character) {
    next(new HttpError(400, ERRORS_TEXT.REQUIRED_PARAMETER_MISSING, 'update validation'));
  }

  if (validator.isEmpty(nickname)) {
    next(new HttpError(400, ERRORS_TEXT.ENTER_NICKNAME, 'update validation'));
  }

  if (!validator.isEmail(email)) {
    next(new HttpError(400, ERRORS_TEXT.INVALID_EMAIL, 'update validation'));
  }

  if (newPassword === password) {
    next(new HttpError(400, ERRORS_TEXT.PASSWORDS_MUST_NOT_MATCH, 'update validation'));
  }

  if (!validator.isStrongPassword(newPassword, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  })) {
    next(new HttpError(400, ERRORS_TEXT.INVALID_PASSWORD, 'update validation'));
  }

  if (confirmNewPassword !== newPassword) {
    next(new HttpError(400, ERRORS_TEXT.PASSWORDS_DO_NOT_MATCH, 'update validation'));
  }

  if (!validateStringWithEnum(character, CharactersEnum)) {
    next(new HttpError(400, ERRORS_TEXT.INVALID_CHARACTER, 'update validation'));
  }
  next();
}
