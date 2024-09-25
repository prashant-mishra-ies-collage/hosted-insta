import React,{useEffect,useState,useRef}from "react"

export default function ProfilePic({changeprofile}){
const hiddenFileInput = useRef(null)
const[image,setImage]=useState("")
const [url,setUrl]=useState("")
//for cloudnary sed url

const postdetails= ()=>{
   
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","duuzgpf8f")
    fetch("https://api.cloudinary.com/v1_1/duuzgpf8f/image/upload",{
    method:"post",
    body:data,
    }).then(res=>res.json())
    .then(data =>setUrl(data.url))
    .catch(err=> console.log(err))
    
    
     }

//url uplod in darabase fetch api
const postPick=()=>{
    fetch("/uploadProfilePic",{
        method:"put",
        headers:{
          "content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          
          pic:url 
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        changeprofile();
        window.location.reload();
      })
      .catch(err=>console.log(err))
    
}




 const handleclick=()=>{
hiddenFileInput.current.click()
    }

    useEffect(()=>{
        if(image){
            postdetails();
            console.log(url)
        }
    },[image]);


useEffect (()=>{
    if(url){
        postPick();
    }
},[url])

    return(
        <div className="profilePic darkBg ">
            <div className="changePic centered">
                <div>
                    <h2>Change Profile Photo</h2>
                </div>
            
            <div style={{borderTop:"1px solid black"}}>
                <button className="upload-btn" style={{color:"#009566"}} onClick={handleclick}>Upload Photo</button>
                <input type="file" accept="image/*" ref={hiddenFileInput}   onChange={(e)=>{setImage(e.target.files[0])}}/>
            </div>
            <div style={{borderTop:"1px solid black"}}>
                <button className="upload-btn"style={{color:"#ED4956"}} onClick={()=>{
                    setUrl(null);
                     postPick();
                     }} 
                     > 
                     Remove Current Photo
                     </button>
            </div>
            <div style={{borderTop:"1px solid black"}}>
                <button style={{background:'none',border:'none',cursor:'pointer',fontSize:'15px'}} onClick={changeprofile}>cancle</button>
            </div>
            </div>
        </div>
    )
}