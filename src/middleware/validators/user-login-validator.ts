import { NextFunction, Request, Response } from "express";
import { ERRORS_TEXT } from "../../errors/errors-text";
import { HttpError } from "../../errors/http-error.class";

export default function userLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body['email'];
  const password = req.body['password'];

  if (!email || !password) {
    next(new HttpError(400, ERRORS_TEXT.REQUIRED_PARAMETER_MISSING, 'login validation'));
  }
  next();
}
