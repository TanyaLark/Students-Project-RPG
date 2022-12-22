import express from "express";
import userLoginValidator from "../middleware/validators/user-login-validator";
import userRegisterValidator from "../middleware/validators/user-registration-validator";
import authorization from "../middleware/auth/authorization";
import userUpdateValidator from "../middleware/validators/user-update-validator";
import { userLoginController, userRegisterController, userUpdateController } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.post('/login', userLoginValidator, userLoginController);

userRouter.post('/registration', userRegisterValidator, userRegisterController);

userRouter.put('/update', authorization, userUpdateValidator, userUpdateController);

export { userRouter };