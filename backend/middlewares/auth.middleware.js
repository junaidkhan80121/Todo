const jwt = require('jsonwebtoken');
const isLoggedIn = async(req,res,next)=>{
    try{
        const accessToken = req.headers.accesstoken;
        if(!accessToken)
            return res.status(401).send({msg:"Unauthorized Request. Please Login/Signup"})
        
         jwt.verify(accessToken, process.env.ACCESSTOKENKEY, (err, user)=>{
            if(err)
                return res.status(401).json({message: 'Invalid Token'});
            // console.log("middleware user",user)
            req.user = user;
         });
        next()
    }
    catch(err){
        return res.status(500).send({msg:"Internal sever error"})
    }
}

module.exports = isLoggedIn;