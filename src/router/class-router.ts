import express from "express";
import authorization from "../middleware/auth/authorization";
import { classController } from "../controllers/class-controller";

const classRouter = express.Router();

classRouter.get('/all', authorization, classController);

export { classRouter };
