 
 import React, { useState ,useEffect} from 'react'; 
 import "../css/createpost.css";
 import { toast } from 'react-toastify';
 import { useNavigate } from 'react-router-dom';


 export default function Createpost() {

  const[body,setBody]=useState("");
  const[image,setImage]=useState("");
  const[url,setUrl]=useState("");
  const navigate=useNavigate()

  const notifyA = (msg) => toast.error(msg)
const notifyB = (msg) => toast.success(msg)


useEffect(()=>{
  if(url){
    fetch("/createPost",{
      method:"post",
      headers:{
        "content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic:url 
      })
    }).then(res=>res.json())
    .then(data=>{if(data.error){
      notifyA(data.error)
    }else{
      notifyB("successfully posted")
      navigate("/")
    }})
    .catch(err=>console.log(err))
  }
//saving post to mongodb

},[url])

//posting image to cloudnary
  const postdetails= ()=>{
console.log(body,image)
const data=new FormData()
data.append("file",image)
data.append("upload_preset","insta-clone")
data.append("cloud_name","duuzgpf8f")
fetch(" https://api.cloudinary.com/v1_1/duuzgpf8f/image/upload",{
method:"post",
body:data
}).then(res=>res.json())
.then(data =>setUrl(data.url))
.catch(err=> console.log(err))



  }

const loadfile=(event)=>{
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }

}

   return (
     <div className='createpost'>
<div className="post-header">
    <h4 style={{margin:"3px auto"}}>Create New Post</h4>
    <button id='post-btn' onClick={()=>{postdetails()}}>Share</button>
</div>
<div className="main-div">
    <img id='output'src='https://www.pngitem.com/pimgs/m/140-1403287_contact-person-icon-png-transparent-png.png' />
    <input type="file" accept='image/*' onChange={(event)=>{
      loadfile(event);
      setImage(event.target.files[0])
      }} 
      />

</div>
<div className="details">
    <div className="card-header">
        <div className="card-pic">
        <img src="https://images.unsplash.com/photo-1720469918563-8e586cdf81d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <h5>Prashant mishra</h5>
    </div>
    <textarea name="text" value={body} onChange={(e)=>{
      setBody(e.target.value)
    }} placeholder='Write capton' type="text"></textarea>
</div>
     </div>
   )
 }
 