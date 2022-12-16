import express from 'express';
import { getClassList } from "../services/classService/class.service";
import authorization from "../middleware/auth/authorization";

const classController = express.Router();

classController.get('/all', authorization, getClassList);

export { classController };

