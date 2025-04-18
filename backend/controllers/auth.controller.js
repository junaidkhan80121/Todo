const authServices = require('../services/auth.services')

const authControllers = {
   loginController: async(req,res)=>{
    try{
    const result = await authServices.loginService(req.body,res)
    return res.status(result.status).send(result.payload)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({msg:"Internal server Error"})
    }
   },
   signupController:async(req,res)=>{
    try{
        const result = await authServices.signupService(req.body,res)
        return res.status(result.status).send(result.payload)
        }
        catch(err){
            console.log(err.message)
            res.status(500).send({msg:"Internal server Error"})
        }
       },
   logoutController: async(req,res)=>{
        const result = await authServices.logoutService(req.cookies.refreshToken,res)
        return res.status(result.status).send(result.payload)
   },
   refreshTokenController:async(req,res)=>{
        const result = await authServices.refreshTokenService(req.cookies.refreshToken,res)
        return res.status(result.status).send(result.payload)
   }

}

module.exports = authControllers;