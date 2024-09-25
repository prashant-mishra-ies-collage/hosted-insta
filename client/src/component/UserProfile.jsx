
import React ,{useEffect,useState} from "react"
import "../css/Profile.css";
import PostDetails from "./PostDetails";
import { useParams } from "react-router-dom";


export default function UserProfile() {
   const picLink="https://t3.ftcdn.net/jpg/05/53/79/60/240_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
    const {userid}=useParams()
const [user,setUser]=useState({})
//const[show,setShow]=useState(false)
const[posts,setPosts]=useState([])
const[isfollow,setIsFollow]=useState(false)


//follow user

const followUser=(userId)=>{
fetch("/follow",{
  method:"put",
  headers:{
    "Content-Type":"application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt") 
  },
  body:JSON.stringify({
    followId:userId
  })

}).then((res)=>res.json())
.then((data)=>{
  console.log(data)
  setIsFollow(true)
})
}
 
//unfollow
const unfollowUser=(userId)=>{
  fetch("/unfollow",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt") 
    },
    body:JSON.stringify({
      followId:userId
    })
  
  }).then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    setIsFollow(false)
  })
  }



  useEffect(()=>{
fetch(`/user/${userid}`,{
  headers:{
    Authorization: "Bearer " + localStorage.getItem("jwt")
  }
})
.then(res=>res.json())
.then((result)=>{
  setUser(result.user)
  setPosts(result.post)
  if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
    setIsFollow(true)
 }

})

 },[userid])
 
  return (
    <div className='profile'>
     
     <div className="profile-frame">
      
{/* profile pic*/}
<div className="profile-pic">
<img src={user.Photo? user.Photo : picLink} alt="" />
  </div>


  {/* profile data*/}
  <div className="profile-data">
    <div style={{display:"flex",alignItems:"center"}}>
    <h1>{user?.name}</h1>
    <button className="followbtn" 
    onClick={()=>{
      if(isfollow){
        unfollowUser(user._id)
      }else{
        followUser(user._id)
      }
    }}
    >
      
      {isfollow ? "unfollow" : "Follow"}
      </button>
    </div>
 
    <div className="profile-info" style={{display:"flex"}}>
    
      <p>{posts.length} post</p>
            <p>{user?.followers ? user.followers.length : "0"} Followers</p>
            <p>{user?.following ? user.following.length : "0"} Following</p>
    </div>
  </div>
</div>
<hr style={{
  width:"90%",
  
  opacity:"0.8",
  margin:"25px auto"
}}/>

{/* gellery*/}


<div className="gallery">
{posts.map((pic)=>{
   return <img src={pic.photo} className="item" alt="post" />

  //return <img src={pic.photo} 
 /* onClick={()=>{
    toggleDetails(pic)
  }}*/
  // className="item"></img>

})}
</div>

     </div>
    
  )
}


