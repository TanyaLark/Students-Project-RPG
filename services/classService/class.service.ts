import { Request, Response } from "express";
import { availableCharacters } from "../../constants";

export async function getClassList(req: Request, res: Response) {
  res.status(200).send(availableCharacters);
}