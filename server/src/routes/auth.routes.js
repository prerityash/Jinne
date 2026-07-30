import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = Router();

//created a register route using register user controller
authRouter.post("/register", authController.registerUserController)

//created a login route using login user controller
authRouter.post("/login", authController.loginUserController)

//created a logout route using login user controller
authRouter.post("/logout", authController.logoutUserController)

export default authRouter;