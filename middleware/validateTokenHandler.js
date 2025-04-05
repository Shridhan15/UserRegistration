const asyncHandler= require("express-async-handler")
const jwt= require("jsonwebtoken")

const validateToken= asyncHandler(async(req ,res ,next)=>{
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization
    //if token is present in the header get from there
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error (" User is not authorized")
            }
            req.user= decoded.user;// append the decoded token(which has user info) and call for next as it is a middlware)
            next()
        })
        if(!token){
            res.status(401)
            throw new Error("User not authorized or token expired")
        }

    }
})

module.exports=validateToken