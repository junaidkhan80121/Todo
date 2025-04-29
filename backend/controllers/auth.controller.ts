const authServices = require('../services/auth.services')
import {Request, Response} from 'express'

export const authController = {
   loginController: async(req:Request,res:Response)=>{
    const result = await authServices.loginService(req.body,res)
    return res.status(result.status).send(result.payload)
   },
   signupController:async(req:Request,res:Response)=>{
        const result = await authServices.signupService(req.body,res)
        return res.status(result.status).send(result.payload)
        
       },
   logoutController: async(req:Request,res:Response)=>{
        const result = await authServices.logoutService(req.cookies.refreshToken,res)
        return res.status(result.status).send(result.payload)
    
   },
   refreshTokenController:async(req:Request,res:Response)=>{
     // console.log("Refresh Token:")
        const result = await authServices.refreshTokenService(req.cookies.refreshToken,res)
        return res.status(result.status).send(result.payload)
   },
   refreshBackend:async(req:Request,res:Response|any)=>{
     const result = await authServices.cronjobRoute(req);
     return res.status(result.status).send(result.payload);

   }

}

exports = authController;