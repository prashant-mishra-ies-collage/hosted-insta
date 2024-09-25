const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const USER=mongoose.model("USER");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const jwt_secret="harshpathakvijaybhaipathak";
const requireLogin=require("../middlewares/requireLogin");

/*router.get('/',(req,res)=>{
    res.send("hello dunia")
})*/

/*router.get("/createPost",requireLogin,(req,res)=>{
console.log("hello auth")
})*/



router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body;
    if (!name || !email || !userName || !password) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exist with that email or userName" })
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {

            const user = new USER({
                name,
                email,
                userName,
                password: hashedPassword
            })

            user.save()
                .then(user => { res.json({ message: "Registered successfully" }) })
                .catch(err => { console.log(err) })
        })
    })

})


//sign in api
router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        req.status(422).json({error:"enter all fild"})
    }
    USER.findOne({email:email}).then((saveduser)=>{
        if(!saveduser){
            return res.status(422).json({error:"invailed email"})
        }
        bcrypt.compare(password,saveduser.password).then((match)=>{
if(match){
   // return res.status(201).json({message:"sign in succefully"})
   const token=jwt.sign({_id:saveduser.id},jwt_secret)
   const{_id,name,email,username}=saveduser
   res.json({token,user:{_id,name,email,username}})
   console.log({token,user:{_id,name,email,username}})
}else{
    return res.status(422).json({error:"invalid password"})
}
        })

        .catch(err=>console.log(err))
    })
})








module.exports=router;