import { Request, Response } from 'express';
import { classService } from "../services/class-service/class.service";

export async function classController(req: Request, res: Response) {
  res.status(200).send(await classService());
  return;
}
