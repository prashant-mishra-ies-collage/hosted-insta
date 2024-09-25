import React ,{useEffect,useState}from "react";
import "../css//Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function MyFollowing() {

const navigate=useNavigate();
const[data,setData]=useState([])
const[comment,setComment]=useState("")
const [show,setShow]=useState(false)
const[item,setItem]=useState([])

  useEffect(()=>{
const token=localStorage.getItem("jwt")
if(!token){
navigate("./signup")
}

fetch("/myfollowingpost",{
  headers:{
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  },
  }).then(res=>res.json())
  .then(result=>setData(result))
  
  .catch(err=>console.log(err))

  },[])


  const toggleComment=(posts)=>{
    if(show){
      setShow(false)
    }else{
      setShow(true)
      setItem(posts)
      
    }
  }



const likePost=(id)=>{
  fetch("/like",{
    method:"put",
    headers:{
       "Content-Type": "application/json",
       "Authorization":"Bearer "+ localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res => res.json())
  .then((result)=>{
    const newData=data.map((posts)=>{
      if(posts._id==result._id){
        return result;
      }else{
        return posts;
      }
     })
     setData(newData);
     console.log(result)
  })
  
}




const unlikePost=(id)=>{
  fetch("/unlike",{
    method:"put",
    headers:{
       "Content-Type": "application/json",
       "Authorization":"Bearer "+ localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then((result)=>{
   // console.log(result)
   const newData=data.map((posts)=>{
    if(posts._id==result._id){
      return result;
    }else{
      return posts;
    }
   })
   setData(newData);
   console.log(result)
  })
  
}


const makeComment=(text,id)=>{
 
  fetch("/comment",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body:JSON.stringify({
      text:text,
      postId:id
    })
  })
  .then(res=>res.json())
  .then((result)=>{
    const newData=data.map((posts)=>{
      if(posts._id==result._id){
        return result;
      }else{
        return posts;
      }
     })
     setData(newData);
    setComment("")

    console.log(result)
  })
}







  return (

    <div className='home'>
{/* card */}
{data.map((posts)=>{
  return(


    <div className="card">
    {/* card header */}
    <div className="card-header">
      <div className="card-pic">
    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
      </div>

      <h5>
      <Link to={`/profile/${posts.postedBy._id}`}>
      {posts.postedBy.name}
      </Link>
       
        </h5>
    </div>
    {/* card-img */}
    <div className="card-img">
      <img src={posts.photo} alt="" />
    </div>
    {/* card content  ther use of javascript function for like and unlike*/}
    <div className="card-content">
      {
        posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
        ( <span className="material-symbols-outlined material-symbols-outlined-red"onClick={()=>{unlikePost(posts._id)}}> 
        favorite
        </span>)
        :( <span className="material-symbols-outlined" onClick={()=>{likePost(posts._id)}}> 
        favorite
        </span>)
      }
   
   
    <p>{posts.likes.length} Likes</p>
    <p>{posts.body}</p>
    <p style={{fontWeight:"bold",cursor:"pointer"}} onClick={()=>{toggleComment(posts)}}>view all comment</p>
    </div>
    {/* addcomment*/}
   
    <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comment, posts._id);
                }}
              >
                Post
              </button>
            </div>
          </div>
          
  )
        
})}



     
{/*show comments      usestate show ka use hua hai */}


{
show && (
<div className="showComment">
  <div className="container">
<div className="postPic">
   <img src={item.photo} alt="" />
</div>
<div className="details">
  {/*card header */}
<div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
      <div className="card-pic">
    <img src="http://res.cloudinary.com/duuzgpf8f/image/upload/v1724158899/slmrqrdqj6dm3nrpo0fz.jpg" alt="" />
      </div>
      <h5>{item.postedBy.name}</h5>
    </div>
  {/*commlentsection*/}
  <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>
    {/*cardcontent*/}
    <div className="card-content">
     
    <p>{item.likes.length}</p>
    <p>{item.body}</p>
   
    </div>

    {/*addcomment*/}
    <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
               onClick={() => {
                makeComment(comment, item._id);
                toggleComment();
                }}
           >
                Post
              </button>
            </div>
          </div>
   
   
    
  </div>

{/*close comment*/}
//here this function use for specially true and false
<div className="close-comment" onClick={()=>{toggleComment()}}>
<span className="material-symbols-outlined material-symbols-outlined-comment">
close
</span>
</div>



</div>
)
}


    </div>
)
}

  
