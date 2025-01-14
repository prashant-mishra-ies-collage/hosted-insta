import React ,{useEffect,useState} from "react"
import "../css/Profile.css";
import PostDetails from "../component/PostDetails";
import ProfilePic from "../component/ProfilePic";

export default function Profile() {
  const picLink="https://t3.ftcdn.net/jpg/05/53/79/60/240_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
const [pic,setPic]=useState([])
const[show,setShow]=useState(false)
const[posts,setPosts]=useState([])
const[changePic,setChangePic]=useState(false)
const[user,setUser]=useState("") 

const toggleDetails=(posts)=>{
  if(show){
    setShow(false)
  }else{
    setShow(true)
    setPosts(posts)
    
  }
}

const changeprofile=()=>{
  if(changePic){
    setChangePic(false)
  }else{
    setChangePic(true)
  }
}

  useEffect(()=>{
fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
  headers:{
    Authorization: "Bearer " + localStorage.getItem("jwt")
  }
})
.then(res=>res.json())
.then((result)=>{
  setPic(result.post)
  setUser(result.user)
  console.log(pic)
})

  },[])
  return (
    <div className='profile'>
     {/* profile frame */ }
     <div className="profile-frame">
      
{/* profile pic*/}
<div className="profile-pic">
<img 
onClick={changeprofile}
src={user.Photo? user.Photo : picLink} alt="" />
  </div>
  {/* profile data*/}
  <div className="profile-data">
    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
    <div className="profile-info" style={{display:"flex"}}>
      <p>{pic? pic.length:"0"} Post</p>
      <p> {user.followers? user.followers.length : "0"} followers</p>
      <p>{user.following? user.following.length : "0"} following</p>
    </div>
  </div>
</div>
<hr style={{
  width:"90%",
  
  opecity:"0.8",
  margin:"25px auto"
}}/>
{/* gellery*/}
<div className="gallery">
{pic.map((pic)=>{
  return <img src={pic.photo} 
  onClick={()=>{
    toggleDetails(pic)
  }}
   className="item"></img>

})}
</div>



{
 show &&
 <PostDetails item={posts} toggleDetails={toggleDetails}/>
}

{

changePic &&
<ProfilePic changeprofile={changeprofile}/>
}

     </div>
    
  )
}
