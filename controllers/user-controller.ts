import express from 'express';
import userRegisterValidator from "../middleware/validators/user-registration-validator";
import { userLogin, userRegister, userUpdate } from "../services/user-service/user.service";
import userLoginValidator from "../middleware/validators/user-login-validator";
import authorization from "../middleware/auth/authorization";
import userUpdateValidator from "../middleware/validators/user-update-validator";

const usersController = express.Router();

usersController.post('/login', userLoginValidator, userLogin);

usersController.post('/registration', userRegisterValidator, userRegister);

usersController.put('/update', authorization, userUpdateValidator, userUpdate);

export { usersController };
