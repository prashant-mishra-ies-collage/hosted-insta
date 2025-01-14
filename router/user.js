const express=require("express");
const router=express.Router();
const mongoose=require("mongoose")
const POST =mongoose.model("POST")
const USER=mongoose.model("USER");
const requireLogin=require("../middlewares/requireLogin")

/*
router.get("/user/:id",(req,res)=>{
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then((user)=>{
        POST.find({postedBy:req.params.id})
        .populate("postedBy","_id")
        .then((err,post)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.status(200).json({user,post})
        })
    }).catch(err=>{
        return res.status(404).json({error:"user not found"})
    })
})*/

router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
      .select("-password")
      .then((user) => {
        POST.find({ postedBy: req.params.id })
          .populate("postedBy", "_id")
          .then((post) => { // यहाँ `err` को `post` से बदल दिया गया है
            res.status(200).json({ user, post });
          })
          .catch((err) => { // यहाँ `catch` का उपयोग किया गया है त्रुटि को संभालने के लिए
            return res.status(422).json({ error: err });
          });
      })
      .catch((err) => {
        return res.status(404).json({ error: "user not found" });
      });
  });


  //follow and following

 /* router.put("/follow",requireLogin,(req,res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
      $push:{followers:req.user._id}
    },{
      new:true
    },(err,result)=>{
      if(err){
        return res.status(422).json({error:err})
      }
      USER.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
      },{
        new:true
      }).then(result =>res.json(result))
      .catch(err =>{return res.status(422).json({error:err})})
    }
  )
  })*/

  router.put("/follow", requireLogin, (req, res) => {
    // पहले followId वाले यूज़र के followers में लॉगिन यूज़र की आईडी डालें
    USER.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(422).json({ error: "फ़ॉलो करने वाला यूज़र नहीं मिला" });
        }
  
        // लॉगिन यूज़र के following में followId डालें
        return USER.findByIdAndUpdate(
          req.user._id,
          { $push: { following: req.body.followId } },
          { new: true }
        );
      })
      .then((currentUser) => {
        res.json(currentUser);
      })
      .catch((err) => {
        res.status(422).json({ error: err.message });
      });
  });
  
  

  //unfollow user

  router.put("/unfollow", requireLogin, (req, res) => {
    // followId वाले यूज़र के followers से लॉगिन यूज़र की आईडी को हटाएं
    USER.findByIdAndUpdate(
      req.body.followId,
      { $pull: { followers: req.user._id } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(422).json({ error: "अनफॉलो करने वाला यूज़र नहीं मिला" });
        }
  
        // लॉगिन यूज़र के following से followId को हटाएं
        return USER.findByIdAndUpdate(
          req.user._id,
          { $pull: { following: req.body.followId } },  // req.followId -> req.body.followId
          { new: true }
        );
      })
      .then((currentUser) => {
        res.json(currentUser);
      })
      .catch((err) => {
        res.status(422).json({ error: err.message });
      });
  });
  


  //to upload profile pic

  router.put("/uploadProfilePic",requireLogin,(req,res)=>{
    USER.findByIdAndUpdate(req.user._id,{
      $set:{Photo:req.body.pic}
    },{
      new:true
    }).then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err.message });
    });
  })
  



module.exports=router;