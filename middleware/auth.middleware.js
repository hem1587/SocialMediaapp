const jwt=require("jsonwebtoken");
require(`dotenv`).config();
const auth=(req,res,next)=>{
    try {
    const token=req.headers.authorization.split(" ")[1];
    if(token){
        
            const decode=jwt.verify(token,process.env.secretKey);
            if(decode){
                console.log(decode);
                req.body.userID=decode.userId;
                req.body.user=decode.name
                next()
            }else{
                res.status(200).json({msg:"invalid token"})
            }
        } else{
            res.status(400).json({msg:"login please"})
        }
    }catch (error) {
        res.status(400).send({error:error})
    }
}
module.exports={
    auth
}