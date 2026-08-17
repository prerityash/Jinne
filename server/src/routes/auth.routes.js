import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = Router();

//created a register route using register user controller
authRouter.post("/register", authController.registerUserController)

//created a login route using login user controller
authRouter.post("/login", authController.loginUserController)

//created a logout route using login user controller
authRouter.get("/logout", authController.logoutUserController)

//created a get user route so that it will return the values of the logged user [uses middleware]
authRouter.get("/get-me", authMiddleware.authUser, authController.getUserController)

export default authRouter;