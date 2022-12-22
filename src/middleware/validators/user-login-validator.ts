import { NextFunction, Request, Response } from "express";
import { ERRORS_TEXT } from "../../errors/errors-text";

export default function userLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body['email'];
  const password = req.body['password'];

  if (!email || !password) {
    res.status(400).send(ERRORS_TEXT.REQUIRED_PARAMETER_MISSING);
    next();
  }
  next();
}
