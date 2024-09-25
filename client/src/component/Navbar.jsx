
import insta from "../assets/insta.svg";
import React,{useContext} from 'react'
import '../css/Navbar.css'
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";



export default function Navbar(login) {
  const navigate=useNavigate();

  const{setModalOpen}=useContext(LoginContext)

const loginStatus=()=>{
const token=localStorage.getItem("jwt")
if(login=== true|| token){
  return[
    <>
    <li>
 <NavLink to="/profile">Profile</NavLink>
</li>
<li>
 <NavLink to="/createpost">Create Post</NavLink>
</li>
<li>
  <NavLink to="/myfollowing">MyFollowing</NavLink>
</li>
<NavLink to={""}><button className="primarybtn" onClick={()=>setModalOpen(true)}>Log Out</button></NavLink>
    </>
  ]
}else{
  return[
    <>
      
<li>
 <NavLink to="/signup">Signup</NavLink>
</li>
<li>
 <NavLink to="/signin">SignIn</NavLink>
</li>
    </>
  ]
}
};



  return (

    <div className='navbar'>
        <img src={insta} alt="" onClick={()=>{navigate("/")}} />
      <ul className="nav-menu">
     { loginStatus()}

       
      </ul>
    </div>
  )
}
