import express from "express";
import authorization from "../middleware/auth/authorization";
import { ClassController } from "../controllers/class-controller";

const classRouter = express.Router();
const classController = new ClassController;

classRouter.get('/all', authorization, classController.getClassStatus);

export { classRouter };
