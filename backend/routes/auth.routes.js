const authRouter = require('express').Router()
const authController = require('../controllers/auth.controller')

authRouter.post('/login',authController.loginController)
authRouter.post('/signup',authController.signupController)
authRouter.get('/refreshtoken', authController.refreshTokenController)
authRouter.get('/logout', authController.logoutController)


module.exports = authRouter;