import { Request, Response } from 'express';
import { ClassService } from "../services/class-service/class.service";

const classService = new ClassService;

export class ClassController {
  async getClassStatus(req: Request, res: Response) {
    res.status(200).send(await classService.getClass());
    return;
  }
}

