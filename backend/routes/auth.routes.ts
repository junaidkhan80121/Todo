export const authRouter = require('express').Router()
import {authController} from '../controllers/auth.controller';

authRouter.post('/login',authController.loginController)
authRouter.post('/signup',authController.signupController)
authRouter.get('/refreshtoken', authController.refreshTokenController)
authRouter.get('/logout', authController.logoutController)


exports = authRouter;