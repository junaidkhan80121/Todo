const authServices = require('../services/auth.services')
import {Request, Response} from 'express'

export const authController = {
   loginController: async(req:Request,res:Response)=>{
    try{
    const result = await authServices.loginService(req.body,res)
    return res.status(result.status).send(result.payload)
    }
    catch(err:any){
        console.log(err.message)
        res.status(500).send({msg:"Internal server Error"})
    }
   },
   signupController:async(req:Request,res:Response)=>{
    try{
        const result = await authServices.signupService(req.body,res)
        return res.status(result.status).send(result.payload)
        }
        catch(err:any){
            console.log(err.message)
            res.status(500).send({msg:"Internal server Error"})
        }
       },
   logoutController: async(req:Request,res:Response)=>{
        const result = await authServices.logoutService(req.cookies.refreshToken,res)
        return res.status(result.status).send(result.payload)
   },
   refreshTokenController:async(req:Request,res:Response)=>{
        const result = await authServices.refreshTokenService(req.cookies.refreshToken,res)
        return res.status(result.status).send(result.payload)
   }

}

exports = authController;