import express from "express";
import userLoginValidator from "../middleware/validators/user-login-validator";
import userRegisterValidator from "../middleware/validators/user-registration-validator";
import authorization from "../middleware/auth/authorization";
import userUpdateValidator from "../middleware/validators/user-update-validator";
import { UserController } from "../controllers/user-controller";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/login', userLoginValidator, userController.loginUser);

userRouter.post('/registration', userRegisterValidator, userController.registrationUser);

userRouter.put('/update', authorization, userUpdateValidator, userController.updateUser);

export { userRouter };