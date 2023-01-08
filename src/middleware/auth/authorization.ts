import { NextFunction, Request, Response } from "express";
import { ERRORS_TEXT } from "../../errors/errors-text";
import * as jwt from 'jsonwebtoken';
import { HttpError } from "../../errors/http-error.class";

export default function authorization(
  req: RequestWithDecodedInfo,
  res: Response,
  next: NextFunction
) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing in environment.");
  }
  const token = getTokenFromHeader(req) as string;
  if (!token) {
    next(new HttpError(401, ERRORS_TEXT.UNAUTHORIZED, 'authorization'))
  }
  try {
    req.decodedInfoFromJWT = jwt.verify(token, process.env.JWT_SECRET) as DecodedUserInfo;
    next();
  } catch (e) {
    next(new HttpError(401, ERRORS_TEXT.UNAUTHORIZED, 'authorization'))
  }
}

function getTokenFromHeader(req: Request) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return null;
  }
  if (authorization.split(" ").length != 2) {
    return null;
  }
  const [tag, token] = authorization.split(" ");
  if (tag === "Token" || tag === "Bearer") {
    return token;
  }
  return;
}

export interface RequestWithDecodedInfo extends Request {
  decodedInfoFromJWT?: DecodedUserInfo;
}

export interface DecodedUserInfo {
  email: string,
  id: string
}