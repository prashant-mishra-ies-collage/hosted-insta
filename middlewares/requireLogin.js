const jwt=require("jsonwebtoken");
const jwt_secret="harshpathakvijaybhaipathak";
const mongoose=require("mongoose")
const USER=mongoose.model("USER");



module.exports=(req,res,next)=>{
  const{authorization}=req.headers;
  if(!authorization){
    return res.status(401).json({error:"you must have logden"})
  }
  const token=authorization.replace("Bearer ","")
  jwt.verify(token,jwt_secret,(err,payload)=>{
    if(err){
      return res.status(401).json({error:"you must have logdign"})
    }
    const{_id}=payload
    USER.findById(_id).then(userData=>{
     // res.json(userData)
     req.user=userData;
     //console.log(userData)
     next();
    })
  })

    
}