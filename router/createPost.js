const express=require("express");
const router=express.Router();
const mongoose=require("mongoose")
const requireLogin=require("../middlewares/requireLogin")
const {route} =require("./auth")
const POST =mongoose.model("POST")




/*
router.get("/allpost",requireLogin,(req,res)=>{
            POST.find({postedBy:req.user._id})
    .populate("postedBy")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then((posts)=>{
       // console.log(posts)
       // res.json(posts)
       

       res.json(posts)
    })
    .catch(err=>console.log(err))
})*/




router.get("/allpost", requireLogin, (req, res) => {
    POST.find({})
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong" });
        });
});



router.get("/mypost",requireLogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then(mypost=>{

        res.json(mypost)
    })
})


router.post("/createPost",requireLogin,(req,res)=>{
    const{body,pic}=req.body;
    if(!pic||!body){
        return res.status(422).json({error:"please add all the fild"})
    }
    req.user
        const post=new 
        POST({
        
            body,
            photo:pic,
            postedBy:req.user
        })
        post.save().then((result)=>{
            return res.json({post:result})
        }).catch(err => console.log(err))
    
})

router.put("/like",requireLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name Photo")
    
    /*.exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })*/
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            console.log(err)
        })
})



router.put("/unlike",requireLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }) .populate("postedBy","_id name Photo")
    
    /*.exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })*/
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            console.log(err)
        })
})

router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })

    
   
})


//app to delete post

router.delete("/deletePost/:postId",requireLogin,(req,res)=>{
    POST.findOne({_id:req.params.postId})
    .populate("postedBy","_id")

   /* .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }if(post.postedBy._id.toString() == req.user._id.toString()){
            post.remove()
            .then(result=>{
                return res.json({message:"post deleted"})
            }).catch(err=>{
                console.log(err)
            })
        }
    })*/
        .then(post => {
            if (!post) {
              return res.status(422).json({ error: "Post not found" });
            }
            
            // Check if the current user is the owner of the post
            if (post.postedBy._id.toString() === req.user._id.toString()) {
              return  post.deleteOne();
            } else {
              return res.status(403).json({ error: "Unauthorized" });
            }
          })
          .then(result => {
            if (result) {
              return res.json({ message: "Post deleted" });
            }
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
          });

})

//toshow following post

router.get("/myfollowingpost",requireLogin,(req,res)=>{
    POST.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err =>{
        console.log(err)
    })
})






module.exports=router;
